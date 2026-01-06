"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { FiX, FiMinus, FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Типи даних
interface CartProduct {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

interface CartItem {
    id: number; // ID запису в корзині
    quantity: number;
    product: CartProduct;
}

export default function CartPage() {
    const { user } = useAuth();
    const router = useRouter();
    const { addToCart, removeFromCart: contextRemove } = useCart(); // Методи контексту

    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [promoCode, setPromoCode] = useState("");
    const [discountPercent, setDiscountPercent] = useState(0);
    const [isCheckingPromo, setIsCheckingPromo] = useState(false);

    const checkPromoCode = async () => {
        if (!promoCode.trim()) return;
        setIsCheckingPromo(true);
        try {
            const res = await fetch("http://localhost:8080/api/promo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: promoCode })
            });
            const data = await res.json();
            if (data.valid) {
                setDiscountPercent(data.discountPercent);
                toast.success(`Code applied! -${data.discountPercent}%`);
            } else {
                setDiscountPercent(0);
                toast.error("Invalid code");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsCheckingPromo(false);
        }
    };

    // --- ЗАВАНТАЖЕННЯ КОРЗИНИ ---
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:8080/api/cart?userId=${user.id}`)
                .then(res => res.json())
                .then(data => {
                    setItems(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setIsLoading(false);
                });
        }
    }, [user]);

    // --- ЗМІНА КІЛЬКОСТІ (+ / -) ---
    const updateQuantity = async (productId: number, newQty: number) => {
        if (newQty < 1) return;

        // 1. Оптимістичне оновлення інтерфейсу (щоб не чекати сервера)
        setItems(prev => prev.map(item =>
            item.product.id === productId ? { ...item, quantity: newQty } : item
        ));

        // 2. Запит на сервер (PUT)
        try {
            await fetch("http://localhost:8080/api/cart", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user?.id, productId, quantity: newQty }),
            });
            // Тут ми не кличемо toast, бо це заважає при швидкому кліканні
        } catch (error) {
            console.error("Failed to update qty");
            toast.error("Error updating quantity");
        }
    };

    // --- ВИДАЛЕННЯ ---
    const handleRemove = async (productId: number) => {
        if (!confirm("Remove this item?")) return;

        // Видаляємо локально
        setItems(prev => prev.filter(item => item.product.id !== productId));

        // Видаляємо глобально (це оновить і хедер, і БД)
        await contextRemove(productId);
    };

    // --- РОЗРАХУНКИ (Summary) ---
    const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const discountAmount = (subtotal * discountPercent) / 100; // Сума знижки
    const tax = 50;
    const shipping = 29;
    const total = subtotal - discountAmount + tax + shipping;

    if (!user) return <div className="text-center py-5">Please Log In to view cart</div>;
    if (isLoading) return <div className="text-center py-5">Loading cart...</div>;

    return (
        <div className="bg-white min-vh-100 py-5">
            <div className="container" style={{ maxWidth: "1100px" }}>
                <h2 className="fw-bold mb-5">Cart</h2>

                <div className="row g-5">
                    {/* ЛІВА КОЛОНКА - ТОВАРИ */}
                    <div className="col-lg-7">
                        {items.length === 0 ? (
                            <div className="text-center py-5 bg-light rounded-3">
                                <h3>Your cart is empty</h3>
                                <Link href="/catalog" className="btn btn-dark mt-3">Go Shopping</Link>
                            </div>
                        ) : (
                            <div className="d-flex flex-column gap-4">
                                {items.map((item) => (
                                    <div key={item.id} className="d-flex align-items-center gap-3 py-3 border-bottom position-relative">

                                        {/* Картинка */}
                                        <div style={{ width: "90px", height: "90px", position: "relative", flexShrink: 0 }}>
                                            <Image
                                                src={item.product.imageUrl || "/img/placeholder.png"}
                                                alt={item.product.name}
                                                fill
                                                style={{ objectFit: "contain" }}
                                            />
                                        </div>

                                        {/* Інфо */}
                                        <div className="flex-grow-1">
                                            <div className="fw-bold text-dark" style={{ fontSize: "16px" }}>
                                                {item.product.name}
                                            </div>
                                            <div className="text-muted small">ID: #{item.product.id}</div>
                                        </div>

                                        {/* Лічильник */}
                                        <div className="d-flex align-items-center gap-3">
                                            <button
                                                className="btn btn-light btn-sm rounded-3 px-2"
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <FiMinus size={14} />
                                            </button>
                                            <span className="fw-medium" style={{ minWidth: "20px", textAlign: "center" }}>
                                                {item.quantity}
                                            </span>
                                            <button
                                                className="btn btn-light btn-sm rounded-3 px-2"
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                            >
                                                <FiPlus size={14} />
                                            </button>
                                        </div>

                                        {/* Ціна */}
                                        <div className="fw-bold fs-5 text-end" style={{ minWidth: "80px" }}>
                                            ${item.product.price * item.quantity}
                                        </div>

                                        {/* Видалити */}
                                        <button
                                            onClick={() => handleRemove(item.product.id)}
                                            className="btn btn-link text-secondary p-0 ms-2"
                                        >
                                            <FiX size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ПРАВА КОЛОНКА - SUMMARY */}
                    <div className="col-lg-5">
                        <div className="p-4 rounded-4 border" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.02)" }}>
                            <h4 className="fw-bold mb-4">Order Summary</h4>

                            {/* Промокоди (заглушки) */}
                            <div className="mb-3">
                                <label className="form-label text-muted small">Discount code / Promo code</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Code"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-outline-dark"
                                        onClick={checkPromoCode}
                                        disabled={isCheckingPromo || discountPercent > 0}
                                    >
                                        {discountPercent > 0 ? "Applied" : "Apply"}
                                    </button>
                                </div>
                                {discountPercent > 0 && <div className="text-success small mt-1">Discount applied: -${discountAmount.toFixed(2)}</div>}
                            </div>


                            {/* Розрахунки */}
                            <div className="d-flex justify-content-between mb-2">
                                <span className="fw-medium">Subtotal</span>
                                <span className="fw-bold">${subtotal}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2 text-muted">
                                <span>Estimated Tax</span>
                                <span>${items.length > 0 ? tax : 0}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-4 text-muted">
                                <span>Estimated shipping & Handling</span>
                                <span>${items.length > 0 ? shipping : 0}</span>
                            </div>

                            <div className="d-flex justify-content-between mb-4 fs-5 fw-bold">
                                <span>Total</span>
                                <span>${items.length > 0 ? total : 0}</span>
                            </div>

                            <button
                                className="btn btn-dark w-100 py-3 fw-bold rounded-3"
                                onClick={() => router.push(`/checkout?total=${total}`)} // Передаємо суму в чекаут
                                disabled={items.length === 0}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}