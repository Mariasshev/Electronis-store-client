"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

// Типи
interface SavedAddress { id: number; label: string; addressLine: string; phone: string; }
interface SavedCard { id: number; brand: string; last4: string; expiryDate: string; cardHolder: string; }

export default function CheckoutPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const totalAmount = searchParams.get("total") || "0";
    const { user } = useAuth();
    const { clearCart } = useCart();

    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // --- STATE ДЛЯ ДАНИХ З БАЗИ ---
    const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
    const [savedCards, setSavedCards] = useState<SavedCard[]>([]);

    // --- STATE ДЛЯ ВИБОРУ ---
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

    // --- STATE ФОРМИ ---
    const [formData, setFormData] = useState({
        firstName: "", lastName: "", address: "", city: "", zip: "", phone: "",
        cardNumber: "", expiry: "", cvv: ""
    });

    const [errors, setErrors] = useState({ cardNumber: "", expiry: "", cvv: "" });

    // 1. ЗАВАНТАЖЕННЯ ДАНИХ
    useEffect(() => {
        if (user) {
            setFormData(prev => ({ ...prev, firstName: user.username || "" }));

            // Адреси
            fetch(`http://localhost:8080/api/addresses?userId=${user.id}`)
                .then(res => res.json())
                .then(data => setSavedAddresses(data))
                .catch(err => console.error(err));

            // Картки
            fetch(`http://localhost:8080/api/cards?userId=${user.id}`)
                .then(res => res.json())
                .then(data => setSavedCards(data))
                .catch(err => console.error(err));
        }
    }, [user]);

    // 2. ОБРОБКА ВИБОРУ АДРЕСИ
    const handleAddressSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const addrId = Number(e.target.value);
        const selected = savedAddresses.find(a => a.id === addrId);
        if (selected) {
            setFormData(prev => ({ ...prev, address: selected.addressLine, phone: selected.phone }));
            toast.success("Address loaded");
        }
    };

    // 3. ОБРОБКА ВИБОРУ КАРТКИ (БЕЗПЕКА)
    const handleCardSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;

        if (val === "new") {
            // Якщо вибрали "Нова картка" - очищаємо поля і даємо вводити
            setSelectedCardId(null);
            setFormData(prev => ({ ...prev, cardNumber: "", expiry: "", cvv: "" }));
        } else {
            // Якщо вибрали збережену - підставляємо маску
            const cardId = Number(val);
            const card = savedCards.find(c => c.id === cardId);
            if (card) {
                setSelectedCardId(cardId);
                setFormData(prev => ({
                    ...prev,
                    cardNumber: `•••• •••• •••• ${card.last4}`, // Візуальна маска
                    expiry: card.expiryDate,
                    cvv: "" // CVV завжди пустий! Користувач має ввести його сам.
                }));
                // Скидаємо помилки
                setErrors({ cardNumber: "", expiry: "", cvv: "" });
            }
        }
    };

    // 4. УНІВЕРСАЛЬНИЙ ОБРОБНИК ВВОДУ
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 5. ВАЛІДАЦІЯ
    const validatePayment = () => {
        let isValid = true;
        const newErrors = { cardNumber: "", expiry: "", cvv: "" };

        // Якщо це НОВА картка - перевіряємо довжину номера
        if (!selectedCardId) {
            const rawCard = formData.cardNumber.replace(/\s/g, "");
            if (rawCard.length < 16) {
                newErrors.cardNumber = "Card number must be 16 digits";
                isValid = false;
            }
            // Перевірка дати тільки для нової картки (збережена вже валідна)
            if (formData.expiry.length !== 5) {
                newErrors.expiry = "Format MM/YY";
                isValid = false;
            }
        }

        // CVV перевіряємо ЗАВЖДИ
        if (formData.cvv.length < 3) {
            newErrors.cvv = "Required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // 6. ОПЛАТА
    const handlePayment = async () => {
        if (!validatePayment()) {
            toast.error("Check payment details");
            return;
        }

        setIsLoading(true);

        try {
            // Якщо обрана збережена картка, ми відправляємо на сервер її ID
            // Якщо нова - відправляємо дані (в реальному проекті тут був би токен)
            const paymentPayload = selectedCardId
                ? { method: "saved_card", cardId: selectedCardId, cvv: formData.cvv }
                : { method: "new_card", ...formData };

            console.log("Processing payment with:", paymentPayload);

            // Створюємо замовлення
            const res = await fetch("http://localhost:8080/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user?.id,
                    address: `${formData.address}, ${formData.city}`,
                    phone: formData.phone,
                    total: totalAmount
                })
            });

            if (res.ok) {
                toast.success("Order placed successfully!");
                clearCart();
                router.push("/account?active=my-orders");
            } else {
                toast.error("Failed to place order");
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error");
        } finally {
            setIsLoading(false);
        }
    };

    // --- ФОРМАТУВАННЯ ВВОДУ (Ті самі функції, що й раніше) ---
    const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedCardId) return; // Не даємо редагувати збережену картку
        let value = e.target.value.replace(/\D/g, "").substring(0, 16);
        const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
        setFormData({ ...formData, cardNumber: formatted });
    };

    return (
        <div className="container py-5" style={{ maxWidth: "800px" }}>
            {/* PROGRESS BAR (Той самий код) */}
            <div className="d-flex justify-content-between mb-5 position-relative">
                <div className="position-absolute top-50 start-0 w-100 bg-light" style={{ height: "2px", zIndex: 0 }}></div>
                {[1, 2, 3].map((s) => (
                    <div key={s} className="d-flex flex-column align-items-center position-relative" style={{ zIndex: 1 }}>
                        <div className={`rounded-circle d-flex align-items-center justify-content-center fw-bold ${step >= s ? "bg-dark text-white" : "bg-white border text-muted"}`} style={{ width: "40px", height: "40px" }}>{s}</div>
                        <span className="small mt-2 bg-white px-1">{s === 1 ? "Address" : s === 2 ? "Shipping" : "Payment"}</span>
                    </div>
                ))}
            </div>

            <div className="card p-4 shadow-sm border-0">
                {/* STEP 1: ADDRESS */}
                {step === 1 && (
                    <div>
                        <h4 className="fw-bold mb-4">Shipping Information</h4>
                        {savedAddresses.length > 0 && (
                            <div className="mb-4 p-3 bg-light rounded border">
                                <label className="form-label fw-bold text-muted small">Load from Address Book:</label>
                                <select className="form-select" onChange={handleAddressSelect} defaultValue="">
                                    <option value="" disabled>Select a saved address...</option>
                                    {savedAddresses.map(addr => <option key={addr.id} value={addr.id}>{addr.label} — {addr.addressLine}</option>)}
                                </select>
                            </div>
                        )}
                        <div className="row g-3">
                            <div className="col-12"><label className="form-label">Address</label><input name="address" className="form-control" value={formData.address} onChange={handleChange} /></div>
                            <div className="col-md-6"><label className="form-label">City</label><input name="city" className="form-control" value={formData.city} onChange={handleChange} /></div>
                            <div className="col-md-6"><label className="form-label">Phone</label><input name="phone" className="form-control" value={formData.phone} onChange={handleChange} /></div>
                        </div>
                        <div className="mt-4 text-end"><button className="btn btn-dark px-4" onClick={() => setStep(2)}>Next: Shipping</button></div>
                    </div>
                )}

                {/* STEP 2: SHIPPING (Без змін) */}
                {step === 2 && (
                    <div>
                        <h4 className="fw-bold mb-4">Shipping Method</h4>
                        <div className="list-group">
                            <label className="list-group-item d-flex gap-3 p-3"><input className="form-check-input" type="radio" name="shipping" defaultChecked /><div>Standard Delivery ($29)</div></label>
                        </div>
                        <div className="mt-4 d-flex justify-content-between"><button className="btn btn-outline-secondary" onClick={() => setStep(1)}>Back</button><button className="btn btn-dark" onClick={() => setStep(3)}>Next: Payment</button></div>
                    </div>
                )}

                {/* STEP 3: PAYMENT (ОНОВЛЕНО) */}
                {step === 3 && (
                    <div>
                        <h4 className="fw-bold mb-4">Payment Details</h4>
                        <div className="alert alert-light border mb-4 d-flex justify-content-between fw-bold fs-5">
                            <span>Total:</span><span>${Number(totalAmount).toFixed(2)}</span>
                        </div>

                        {/* ВИБІР ЗБЕРЕЖЕНОЇ КАРТКИ */}
                        {savedCards.length > 0 && (
                            <div className="mb-4">
                                <label className="form-label fw-bold small text-muted">Select Payment Method</label>
                                <select className="form-select py-3" onChange={handleCardSelect} defaultValue="new">
                                    <option value="new">+ Use a new credit card</option>
                                    {savedCards.map(c => (
                                        <option key={c.id} value={c.id}>
                                            {c.brand} ending in •••• {c.last4} (Exp: {c.expiryDate})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="row g-3">
                            <div className="col-12">
                                <label className="form-label">Card Number</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white"><i className="bi bi-credit-card"></i></span>
                                    <input
                                        className={`form-control ${errors.cardNumber ? "is-invalid" : ""} ${selectedCardId ? "bg-light text-muted" : ""}`}
                                        placeholder="0000 0000 0000 0000"
                                        value={formData.cardNumber}
                                        onChange={handleCardInput}
                                        disabled={!!selectedCardId} // Блокуємо, якщо вибрана збережена
                                    />
                                </div>
                                {errors.cardNumber && <div className="text-danger small mt-1">{errors.cardNumber}</div>}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Expiry Date</label>
                                <input
                                    className={`form-control ${errors.expiry ? "is-invalid" : ""} ${selectedCardId ? "bg-light text-muted" : ""}`}
                                    placeholder="MM/YY"
                                    value={formData.expiry}
                                    onChange={(e) => setFormData({...formData, expiry: e.target.value})} // Спрощено для прикладу
                                    disabled={!!selectedCardId} // Блокуємо
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">CVV <span className="text-danger">*</span></label>
                                <input
                                    type="password"
                                    maxLength={3}
                                    className={`form-control ${errors.cvv ? "is-invalid" : ""}`}
                                    placeholder="123"
                                    value={formData.cvv}
                                    onChange={(e) => {
                                        setFormData({...formData, cvv: e.target.value.replace(/\D/g, "")});
                                        setErrors({...errors, cvv: ""});
                                    }}
                                />
                                {selectedCardId && <div className="form-text text-primary"><small>Please enter CVV to confirm saved card.</small></div>}
                                {errors.cvv && <div className="text-danger small mt-1">{errors.cvv}</div>}
                            </div>
                        </div>

                        <div className="mt-4 d-flex justify-content-between">
                            <button className="btn btn-outline-secondary px-4" onClick={() => setStep(2)}>Back</button>
                            <button className="btn btn-success px-4 py-2 fw-bold w-50" onClick={handlePayment} disabled={isLoading}>
                                {isLoading ? "Processing..." : `Pay $${Number(totalAmount).toFixed(2)}`}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}