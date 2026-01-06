"use client";

import { useMemo, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import toast from "react-hot-toast";

type MenuGroup = "manage" | "orders" | "wishlist";
type MenuId = "my-profile" | "address-book" | "payment-options" | "my-wishlist" | "my-orders";

type MenuItem = { id: MenuId; label: string; group: MenuGroup; };
type Address = { id?: number; userId?: number; label: string; addressLine: string; phone: string; };

// ВИПРАВЛЕНИЙ ТИП КАРТКИ (під Java модель)
type Card = {
    id: number;
    brand: string;
    last4: string;
    expiryDate: string; // Було exp
    cardHolder: string; // Було holder
};

type WishItem = { id: number; title: string; price: number; };
type OrderItem = { productName: string; quantity: number; price: number; imageUrl: string; };
type Order = { id: number; totalPrice: number; status: string; createdAt: string; items: OrderItem[]; };

type Product = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
};

export default function AccountPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [active, setActive] = useState<MenuId>("my-profile");

    // ДАНІ
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [addresses, setAddresses] = useState<Address[]>([]);

    // --- ВИПРАВЛЕНО: Тільки один стейт для карток ---
    const [cards, setCards] = useState<Card[]>([]);

    // --- STATE ПРОФІЛЮ ---
    const [profileData, setProfileData] = useState({
        username: "",
        email: "",
        phone: "",
        address: "",
    });

    // --- STATE ПАРОЛІВ ---
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    // --- STATE АДРЕС ---
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [newAddressData, setNewAddressData] = useState({ label: "HOME", addressLine: "", phone: "" });

    // --- STATE КАРТОК (Форма додавання) ---
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [newCardData, setNewCardData] = useState({ number: "", holder: "", expiry: "", cvv: "" });

    // --- FETCH DATA ---
    useEffect(() => {
        if (user?.email) {
            // 1. Profile
            fetch(`http://localhost:8080/api/user?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setProfileData({
                        username: data.username || "",
                        email: data.email || "",
                        phone: data.phone || "",
                        address: data.address || "",
                    });
                })
                .catch(err => console.error(err));

            // 2. Addresses
            fetch(`http://localhost:8080/api/addresses?userId=${user.id}`)
                .then((res) => res.json())
                .then((data) => setAddresses(data))
                .catch(err => console.error(err));

            // 3. Wishlist
            fetch(`http://localhost:8080/api/wishlist?userId=${user.id}`)
                .then((res) => res.json())
                .then((data) => setWishlist(data))
                .catch((err) => console.error("Wishlist fetch error:", err));

            // 4. Orders
            fetch(`http://localhost:8080/api/orders?userId=${user.id}`)
                .then(res => res.json())
                .then(data => setOrders(data))
                .catch(err => console.error(err));

            // 5. Cards (НОВЕ)
            fetch(`http://localhost:8080/api/cards?userId=${user.id}`)
                .then(res => res.json())
                .then(data => setCards(data))
                .catch(err => console.error(err));
        }
    }, [user]);

    // --- HANDLERS: PROFILE ---
    const handlePasswordChange = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New passwords do not match!");
            return false;
        }
        if (passwordData.newPassword.length < 6) {
            alert("Password must be at least 6 characters");
            return false;
        }
        try {
            const res = await fetch("http://localhost:8080/api/user", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: user?.email,
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                }),
            });
            if (res.ok) {
                alert("Password changed successfully!");
                setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                return true;
            } else {
                const err = await res.json();
                alert("Error changing password: " + (err.error || "Unknown error"));
                return false;
            }
        } catch (error) { console.error(error); return false; }
    };

    const handleSaveChanges = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/user", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profileData),
            });
            if (res.ok) {
                if (passwordData.currentPassword && passwordData.newPassword) {
                    await handlePasswordChange();
                } else {
                    alert("Profile updated successfully!");
                }
            }
        } catch (error) { console.error(error); }
    };

    // --- HANDLERS: ADDRESS ---
    const startAddingAddress = () => { setNewAddressData({ label: "HOME", addressLine: "", phone: "" }); setIsAddingAddress(true); };
    const cancelAddingAddress = () => { setIsAddingAddress(false); };

    const saveNewAddress = async () => {
        if (!user) return;
        const newAddr = { userId: user.id, label: newAddressData.label, addressLine: newAddressData.addressLine, phone: newAddressData.phone };
        try {
            const res = await fetch("http://localhost:8080/api/addresses", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newAddr) });
            if (res.ok) {
                const refresh = await fetch(`http://localhost:8080/api/addresses?userId=${user.id}`);
                setAddresses(await refresh.json());
                setIsAddingAddress(false);
            } else alert("Error saving address");
        } catch (error) { console.error(error); }
    };

    const handleDeleteAddress = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        try { await fetch(`http://localhost:8080/api/addresses?id=${id}`, { method: "DELETE" }); setAddresses(prev => prev.filter(a => a.id !== id)); } catch (error) { console.error(error); }
    };

    // --- HANDLERS: CARDS ---
    const handleAddCard = async () => {
        if (!newCardData.number || !newCardData.holder || !newCardData.expiry) return toast.error("Fill all fields");

        try {
            const res = await fetch("http://localhost:8080/api/cards", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user?.id,
                    cardNumber: newCardData.number,
                    cardHolder: newCardData.holder,
                    expiryDate: newCardData.expiry
                })
            });

            if (res.ok) {
                const refresh = await fetch(`http://localhost:8080/api/cards?userId=${user?.id}`);
                setCards(await refresh.json());
                setIsAddingCard(false);
                setNewCardData({ number: "", holder: "", expiry: "", cvv: "" });
                toast.success("Card added");
            } else {
                toast.error("Error adding card");
            }
        } catch (e) { console.error(e); }
    };

    const handleDeleteCard = async (id: number) => {
        if(!confirm("Remove this card?")) return;
        try {
            await fetch(`http://localhost:8080/api/cards?id=${id}`, { method: "DELETE" });
            setCards(prev => prev.filter(c => c.id !== id));
            toast.success("Card removed");
        } catch (e) { console.error(e); }
    };

    const formatCardNumber = (val: string) => val.replace(/\D/g, "").substring(0, 16).replace(/.{1,4}/g, "$& ").trim();
    const formatExpiry = (val: string) => {
        let v = val.replace(/\D/g, "").substring(0, 4);
        if (v.length >= 2) v = v.substring(0, 2) + "/" + v.substring(2);
        return v;
    };

    // --- MENU HELPERS ---
    const menu = useMemo<MenuItem[]>(() => [
        { id: "my-profile", label: "My Profile", group: "manage" },
        { id: "address-book", label: "Address Book", group: "manage" },
        { id: "payment-options", label: "My Payment Options", group: "manage" },
        { id: "my-wishlist", label: "My Wishlist", group: "wishlist" },
        { id: "my-orders", label: "My Orders", group: "orders" },
    ], []);

    const sectionCardStyle = { border: "1px solid #efefef", background: "#fff" } as const;
    const linkStyle = (isActive: boolean) => ({ display: "block", padding: "6px 0", fontSize: 12, color: isActive ? "#111" : "#8b8b8b", textDecoration: "none", cursor: "pointer", fontWeight: isActive ? 600 : 400 } as const);

    // --- RENDER RIGHT PANEL ---
    const renderRightPanel = () => {
        if (active === "my-profile") {
            return (
                <div className="rounded-3 p-3 p-lg-4" style={sectionCardStyle}>
                    <div className="fw-semibold mb-3" style={{ fontSize: 14 }}>Edit Your Profile</div>
                    <div className="row g-3">
                        <div className="col-12 col-md-6">
                            <label className="form-label" style={{ fontSize: 12 }}>Full Name</label>
                            <input className="form-control" value={profileData.username} onChange={(e) => setProfileData({ ...profileData, username: e.target.value })} style={{ height: 40, fontSize: 12 }} />
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label" style={{ fontSize: 12 }}>Email</label>
                            <input className="form-control" value={profileData.email} disabled style={{ height: 40, fontSize: 12, background: "#f9f9f9" }} />
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label" style={{ fontSize: 12 }}>Phone</label>
                            <input className="form-control" value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} style={{ height: 40, fontSize: 12 }} />
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label" style={{ fontSize: 12 }}>Main Address</label>
                            <input className="form-control" value={profileData.address} onChange={(e) => setProfileData({ ...profileData, address: e.target.value })} style={{ height: 40, fontSize: 12 }} />
                        </div>
                        <div className="col-12 mt-4">
                            <div className="mb-3 fw-semibold" style={{ fontSize: 14 }}>Password Changes</div>
                            <div className="d-flex flex-column gap-3">
                                <input type="password" className="form-control" placeholder="Current Password" style={{ height: 40, fontSize: 12 }} value={passwordData.currentPassword} onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})} />
                                <input type="password" className="form-control" placeholder="New Password" style={{ height: 40, fontSize: 12 }} value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} />
                                <input type="password" className="form-control" placeholder="Confirm New Password" style={{ height: 40, fontSize: 12 }} value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end gap-3 mt-4">
                        <button type="button" className="btn btn-dark" style={{ width: 160, height: 44, borderRadius: 10 }} onClick={handleSaveChanges}>Save Changes</button>
                    </div>
                </div>
            );
        }

        if (active === "address-book") {
            return (
                <div className="rounded-3 p-3 p-lg-4" style={sectionCardStyle}>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <div className="fw-semibold" style={{ fontSize: 14 }}>Address Book</div>
                        {!isAddingAddress && <button className="btn btn-outline-dark" style={{ height: 40, borderRadius: 10, fontSize: 12 }} onClick={startAddingAddress}>+ Add Address</button>}
                    </div>
                    {isAddingAddress && (
                        <div className="p-3 mb-3 rounded-3" style={{ background: "#f8f9fa", border: "1px dashed #ced4da" }}>
                            <div className="mb-2 fw-bold" style={{fontSize: 13}}>New Address Details</div>
                            <div className="row g-2">
                                <div className="col-12 col-md-4"><input className="form-control" placeholder="Label" style={{ fontSize: 12 }} value={newAddressData.label} onChange={(e) => setNewAddressData({...newAddressData, label: e.target.value})} /></div>
                                <div className="col-12 col-md-4"><input className="form-control" placeholder="Address" style={{ fontSize: 12 }} value={newAddressData.addressLine} onChange={(e) => setNewAddressData({...newAddressData, addressLine: e.target.value})} /></div>
                                <div className="col-12 col-md-4"><input className="form-control" placeholder="Phone" style={{ fontSize: 12 }} value={newAddressData.phone} onChange={(e) => setNewAddressData({...newAddressData, phone: e.target.value})} /></div>
                            </div>
                            <div className="d-flex gap-2 mt-3"><button className="btn btn-success btn-sm" onClick={saveNewAddress}>Save</button><button className="btn btn-outline-secondary btn-sm" onClick={cancelAddingAddress}>Cancel</button></div>
                        </div>
                    )}
                    <div className="d-flex flex-column gap-3">
                        {addresses.map((a) => (
                            <div key={a.id} className="rounded-3 p-3" style={{ border: "1px solid #ededed", background: "#fafafa" }}>
                                <div className="d-flex align-items-start justify-content-between gap-2">
                                    <div><div className="d-flex align-items-center gap-2 mb-1"><div className="fw-semibold" style={{ fontSize: 13 }}>{a.addressLine}</div><span className="badge bg-dark" style={{ fontSize: 10 }}>{a.label}</span></div><div className="text-secondary" style={{ fontSize: 12 }}>{a.phone}</div></div>
                                    <button className="btn btn-outline-danger" style={{ height: 34, borderRadius: 10, fontSize: 12 }} onClick={() => handleDeleteAddress(a.id!)}>Delete</button>
                                </div>
                            </div>
                        ))}
                        {addresses.length === 0 && !isAddingAddress && <div className="text-secondary" style={{ fontSize: 12 }}>No addresses found. Add one!</div>}
                    </div>
                </div>
            );
        }

        if (active === "payment-options") {
            return (
                <div className="rounded-3 p-3 p-lg-4" style={sectionCardStyle}>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="fw-semibold" style={{ fontSize: 14 }}>My Payment Options</div>
                        {!isAddingCard && (
                            <button className="btn btn-outline-dark" style={{ height: 40, borderRadius: 10, fontSize: 12 }} onClick={() => setIsAddingCard(true)}>
                                + Add Card
                            </button>
                        )}
                    </div>

                    {isAddingCard && (
                        <div className="p-4 mb-4 rounded-3 border bg-light">
                            <h6 className="mb-3 fw-bold">Add New Card</h6>
                            <div className="row g-3">
                                <div className="col-12">
                                    <input className="form-control" placeholder="Card Number"
                                           value={newCardData.number}
                                           onChange={e => setNewCardData({...newCardData, number: formatCardNumber(e.target.value)})}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input className="form-control" placeholder="Card Holder Name"
                                           value={newCardData.holder}
                                           onChange={e => setNewCardData({...newCardData, holder: e.target.value})}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <input className="form-control" placeholder="MM/YY"
                                           value={newCardData.expiry}
                                           onChange={e => setNewCardData({...newCardData, expiry: formatExpiry(e.target.value)})}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <input className="form-control" placeholder="CVV" type="password" maxLength={3}
                                           value={newCardData.cvv}
                                           onChange={e => setNewCardData({...newCardData, cvv: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-dark" onClick={handleAddCard}>Save Card</button>
                                <button className="btn btn-outline-secondary" onClick={() => setIsAddingCard(false)}>Cancel</button>
                            </div>
                        </div>
                    )}

                    {cards.length === 0 && !isAddingCard ? (
                        <div className="text-center text-muted py-4">No saved cards.</div>
                    ) : (
                        <div className="row g-3">
                            {cards.map((c) => (
                                <div key={c.id} className="col-12 col-md-6">
                                    <div className="rounded-4 p-4 position-relative"
                                         style={{
                                             background: c.brand === 'VISA' ? "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)" : "linear-gradient(135deg, #0c0c0c, #434343)",
                                             color: "#fff",
                                             minHeight: 160,
                                             boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
                                         }}>
                                        <button onClick={() => handleDeleteCard(c.id)} className="position-absolute top-0 end-0 m-3 btn btn-sm btn-link text-white opacity-50 hover-opacity-100 text-decoration-none" style={{fontSize: 20}}>&times;</button>
                                        <div className="d-flex justify-content-between mb-4"><div style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: 1 }}>{c.brand}</div></div>
                                        <div style={{ fontSize: 22, letterSpacing: 3, marginBottom: 20, fontFamily: 'monospace' }}>•••• •••• •••• {c.last4}</div>
                                        <div className="d-flex justify-content-between align-items-end">
                                            <div><div style={{ fontSize: 10, opacity: 0.7, textTransform: 'uppercase' }}>Card Holder</div><div style={{ fontSize: 14, fontWeight: 500 }}>{c.cardHolder}</div></div>
                                            <div><div style={{ fontSize: 10, opacity: 0.7, textTransform: 'uppercase' }}>Expires</div><div style={{ fontSize: 14, fontWeight: 500 }}>{c.expiryDate}</div></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        if (active === "my-wishlist") {
            return (
                <div className="rounded-3 p-3 p-lg-4" style={sectionCardStyle}>
                    <div className="fw-semibold mb-4" style={{ fontSize: 14 }}>My Wishlist</div>
                    {wishlist.length > 0 ? (
                        <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-md-3">
                            {wishlist.map((product) => (
                                <div key={product.id} className="col">
                                    <ProductCard id={product.id} title={product.name} price={product.price} image={product.imageUrl} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-5 text-muted"><p>Your wishlist is empty.</p><button onClick={() => router.push('/catalog')} className="btn btn-dark btn-sm">Go to Catalog</button></div>
                    )}
                </div>
            );
        }

        if (active === "my-orders") {
            return (
                <div className="rounded-3 p-3 p-lg-4" style={sectionCardStyle}>
                    <div className="fw-semibold mb-4" style={{ fontSize: 14 }}>Order History</div>
                    {orders.length === 0 ? (
                        <div className="text-muted text-center py-5">You haven&#39;t placed any orders yet.</div>
                    ) : (
                        <div className="d-flex flex-column gap-4">
                            {orders.map((order) => (
                                <div key={order.id} className="border rounded-3 p-3 bg-light">
                                    <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
                                        <div><div className="fw-bold">Order #{order.id}</div><div className="text-muted small">{new Date(order.createdAt).toLocaleDateString()}</div></div>
                                        <div className="text-end"><div className="fw-bold">${order.totalPrice}</div><span className="badge bg-success">{order.status}</span></div>
                                    </div>
                                    <div className="d-flex flex-column gap-2">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="d-flex align-items-center gap-3">
                                                <div style={{width: 40, height: 40, position: 'relative', background: '#fff', borderRadius: 4, overflow: 'hidden'}}><img src={item.imageUrl || '/img/placeholder.png'} alt="img" style={{width: '100%', height: '100%', objectFit: 'contain'}} /></div>
                                                <div className="flex-grow-1 small"><div className="fw-medium">{item.productName}</div><div className="text-muted">{item.quantity} x ${item.price}</div></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }
        return null;
    };

    if (!user) return <div className="text-center py-5">Please Log In...</div>;

    return (
        <div style={{ background: "#fff", minHeight: "100vh" }}>
            <div className="container py-4 py-lg-5">
                <div className="mx-auto" style={{ maxWidth: 1040 }}>
                    <div className="mb-4" style={{ fontSize: 12, color: "#8b8b8b" }}>
                        <span>Home</span><span className="mx-2">/</span><span style={{ color: "#111", fontWeight: 500 }}>My Account</span>
                    </div>

                    <div className="row g-4">
                        <aside className="col-12 col-lg-3">
                            <div style={{ borderRight: "1px solid #efefef" }} className="pe-lg-3">
                                <div className="mb-2" style={{ fontSize: 12, fontWeight: 600 }}>Manage My Account</div>
                                <div style={{ paddingLeft: 12, marginBottom: 20 }}>
                                    {menu.filter(x => x.group === "manage").map(x => (
                                        <a key={x.id} onClick={() => setActive(x.id)} style={linkStyle(active === x.id)}>{x.label}</a>
                                    ))}
                                </div>
                                <div className="mb-2" style={{ fontSize: 12, fontWeight: 600 }}>My Orders</div>
                                <div style={{ paddingLeft: 12, marginBottom: 20 }}>
                                    {menu.filter(x => x.group === "orders").map(x => (
                                        <a key={x.id} onClick={() => setActive(x.id)} style={linkStyle(active === x.id)}>{x.label}</a>
                                    ))}
                                </div>
                                <div className="mb-2" style={{ fontSize: 12, fontWeight: 600 }}>My Stuff</div>
                                <div style={{ paddingLeft: 12 }}>
                                    {menu.filter(x => x.group === "wishlist").map(x => (
                                        <a key={x.id} onClick={() => setActive(x.id)} style={linkStyle(active === x.id)}>{x.label}</a>
                                    ))}
                                </div>
                            </div>
                        </aside>
                        <section className="col-12 col-lg-9">{renderRightPanel()}</section>
                    </div>
                </div>
            </div>
        </div>
    );
}