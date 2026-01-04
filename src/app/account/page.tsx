"use client";

import { useMemo, useState } from "react";

type MenuGroup = "manage" | "orders" | "wishlist";
type MenuId =
  | "my-profile"
  | "address-book"
  | "payment-options"
  | "my-returns"
  | "my-cancellations"
  | "my-wishlist";

type MenuItem = {
  id: MenuId;
  label: string;
  group: MenuGroup;
};

type Address = {
  id: number;
  label: "HOME" | "OFFICE";
  title: string;
  line1: string;
  phone: string;
  isDefault?: boolean;
};

type Card = {
  id: number;
  brand: "VISA" | "MASTERCARD";
  last4: string;
  exp: string;
  holder: string;
  isDefault?: boolean;
};

type OrderRow = {
  id: string;
  date: string;
  status: "Processing" | "Completed's" | "Cancelled" | "Returned";
  total: number;
};

type WishItem = {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
};

export default function AccountPage() {
  const menu = useMemo<MenuItem[]>(
    () => [
      { id: "my-profile", label: "My Profile", group: "manage" },
      { id: "address-book", label: "Address Book", group: "manage" },
      { id: "payment-options", label: "My Payment Options", group: "manage" },

      { id: "my-returns", label: "My Returns", group: "orders" },
      { id: "my-cancellations", label: "My Cancellations", group: "orders" },

      { id: "my-wishlist", label: "My Wishlist", group: "wishlist" },
    ],
    []
  );

  const [active, setActive] = useState<MenuId>("my-profile");

  // Profile form (mock)
  const [profile, setProfile] = useState({
    firstName: "Md",
    lastName: "Rimel",
    email: "rimel1111@gmail.com",
    address: "Kingston, 5236, United State",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Address book (mock)
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      label: "HOME",
      title: "2118 Thornridge",
      line1: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
      phone: "(209) 555-0104",
      isDefault: true,
    },
    {
      id: 2,
      label: "OFFICE",
      title: "Headoffice",
      line1: "2715 Ash Dr. San Jose, South Dakota 83475",
      phone: "(704) 555-0127",
    },
  ]);

  // Payment options (mock)
  const [cards, setCards] = useState<Card[]>([
    { id: 1, brand: "MASTERCARD", last4: "9530", exp: "10/27", holder: "Rimel", isDefault: true },
    { id: 2, brand: "VISA", last4: "4021", exp: "08/26", holder: "Rimel" },
  ]);

  // Orders mock
  const returns = useMemo<OrderRow[]>(
    () => [
      { id: "#R-10291", date: "21 Jan, 2023", status: "Returned", total: 199 },
      { id: "#R-10292", date: "09 Feb, 2023", status: "Returned", total: 549 },
    ],
    []
  );

  const cancellations = useMemo<OrderRow[]>(
    () => [
      { id: "#C-20111", date: "11 Mar, 2023", status: "Cancelled", total: 1399 },
      { id: "#C-20118", date: "28 Apr, 2023", status: "Cancelled", total: 399 },
    ],
    []
  );

  // Wishlist mock
  const [wishlist, setWishlist] = useState<WishItem[]>([
    { id: 1, title: "Apple iPhone 14 Pro 512GB Gold (MQ233)", price: 1437 },
    { id: 2, title: "AirPods Max Silver Starlight Aluminium", price: 549 },
    { id: 3, title: "Apple Watch Series 9 GPS 41mm Starlight Aluminium", price: 399 },
    { id: 4, title: "Apple iPhone 14 Pro 1TB Gold (MQ2V3)", price: 1499 },
  ]);

  const sectionCardStyle = {
    border: "1px solid #efefef",
    background: "#fff",
  } as const;

  const linkStyle = (isActive: boolean) =>
    ({
      display: "block",
      padding: "6px 0",
      fontSize: 12,
      color: isActive ? "#111" : "#8b8b8b",
      textDecoration: "none",
      cursor: "pointer",
      fontWeight: isActive ? 600 : 400,
    } as const);

  const setDefaultAddress = (id: number) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const deleteAddress = (id: number) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const addAddress = () => {
    const nextId = Math.max(0, ...addresses.map((a) => a.id)) + 1;
    setAddresses((prev) => [
      ...prev,
      {
        id: nextId,
        label: "HOME",
        title: `New Address ${nextId}`,
        line1: "Street, City, Country (mock)",
        phone: "(000) 000-0000",
      },
    ]);
  };

  const setDefaultCard = (id: number) => {
    setCards((prev) => prev.map((c) => ({ ...c, isDefault: c.id === id })));
  };

  const deleteCard = (id: number) => setCards((prev) => prev.filter((c) => c.id !== id));

  const addCard = () => {
    const nextId = Math.max(0, ...cards.map((c) => c.id)) + 1;
    setCards((prev) => [
      ...prev,
      { id: nextId, brand: "VISA", last4: String(1000 + nextId).slice(-4), exp: "12/28", holder: "Rimel" },
    ]);
  };

  const removeWish = (id: number) => setWishlist((prev) => prev.filter((w) => w.id !== id));

  // --- Right panel renders
  const RightPanel = () => {
    if (active === "my-profile") {
      return (
        <div className="rounded-3 p-3 p-lg-4" style={sectionCardStyle}>
          <div className="fw-semibold mb-3" style={{ fontSize: 14 }}>
            Edit Your Profile
          </div>

          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label" style={{ fontSize: 12 }}>
                First Name
              </label>
              <input
                className="form-control"
                value={profile.firstName}
                onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))}
                style={{ height: 40, fontSize: 12 }}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label" style={{ fontSize: 12 }}>
                Last Name
              </label>
              <input
                className="form-control"
                value={profile.lastName}
                onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))}
                style={{ height: 40, fontSize: 12 }}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label" style={{ fontSize: 12 }}>
                Email
              </label>
              <input
                className="form-control"
                value={profile.email}
                onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                style={{ height: 40, fontSize: 12 }}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label" style={{ fontSize: 12 }}>
                Address
              </label>
              <input
                className="form-control"
                value={profile.address}
                onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))}
                style={{ height: 40, fontSize: 12 }}
              />
            </div>

            <div className="col-12 mt-2">
              <div className="mb-2" style={{ fontSize: 12, fontWeight: 600 }}>
                Password Changes
              </div>

              <div className="d-flex flex-column gap-2">
                <input
                  className="form-control"
                  placeholder="Current Password"
                  type="password"
                  value={profile.currentPassword}
                  onChange={(e) => setProfile((p) => ({ ...p, currentPassword: e.target.value }))}
                  style={{ height: 40, fontSize: 12 }}
                />
                <input
                  className="form-control"
                  placeholder="New Password"
                  type="password"
                  value={profile.newPassword}
                  onChange={(e) => setProfile((p) => ({ ...p, newPassword: e.target.value }))}
                  style={{ height: 40, fontSize: 12 }}
                />
                <input
                  className="form-control"
                  placeholder="Confirm New Password"
                  type="password"
                  value={profile.confirmPassword}
                  onChange={(e) => setProfile((p) => ({ ...p, confirmPassword: e.target.value }))}
                  style={{ height: 40, fontSize: 12 }}
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-3 mt-4">
            <button
              type="button"
              className="btn btn-outline-dark"
              style={{ width: 140, height: 44, borderRadius: 10 }}
              onClick={() =>
                setProfile({
                  firstName: "Md",
                  lastName: "Rimel",
                  email: "rimel1111@gmail.com",
                  address: "Kingston, 5236, United State",
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                })
              }
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-dark"
              style={{ width: 160, height: 44, borderRadius: 10 }}
              onClick={() => alert("Saved (mock) ✅")}
            >
              Save Changes
            </button>
          </div>
        </div>
      );
    }

    if (active === "address-book") {
      return (
        <div className="rounded-3 p-3 p-lg-4" style={sectionCardStyle}>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="fw-semibold" style={{ fontSize: 14 }}>
              Address Book
            </div>
            <button className="btn btn-outline-dark" style={{ height: 40, borderRadius: 10, fontSize: 12 }} onClick={addAddress}>
              + Add Address
            </button>
          </div>

          <div className="d-flex flex-column gap-3">
            {addresses.map((a) => (
              <div key={a.id} className="rounded-3 p-3" style={{ border: "1px solid #ededed", background: "#fafafa" }}>
                <div className="d-flex align-items-start justify-content-between gap-2">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <div className="fw-semibold" style={{ fontSize: 13 }}>
                        {a.title}
                      </div>
                      <span
                        className="badge"
                        style={{
                          background: "#111",
                          color: "#fff",
                          fontSize: 10,
                          borderRadius: 6,
                          padding: "4px 8px",
                        }}
                      >
                        {a.label}
                      </span>
                      {a.isDefault && (
                        <span className="badge" style={{ background: "#2b8a3e", color: "#fff", fontSize: 10, borderRadius: 6, padding: "4px 8px" }}>
                          Default
                        </span>
                      )}
                    </div>
                    <div className="text-secondary" style={{ fontSize: 12 }}>
                      {a.line1}
                    </div>
                    <div className="text-secondary" style={{ fontSize: 12 }}>
                      {a.phone}
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-dark"
                      style={{ height: 34, borderRadius: 10, fontSize: 12 }}
                      onClick={() => setDefaultAddress(a.id)}
                    >
                      Set default
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      style={{ height: 34, borderRadius: 10, fontSize: 12 }}
                      onClick={() => deleteAddress(a.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {addresses.length === 0 && (
              <div className="text-secondary" style={{ fontSize: 12 }}>
                No addresses yet.
              </div>
            )}
          </div>
        </div>
      );
    }

    if (active === "payment-options") {
      return (
        <div className="rounded-3 p-3 p-lg-4" style={sectionCardStyle}>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="fw-semibold" style={{ fontSize: 14 }}>
              Payment Options
            </div>
            <button className="btn btn-outline-dark" style={{ height: 40, borderRadius: 10, fontSize: 12 }} onClick={addCard}>
              + Add Card
            </button>
          </div>

          <div className="row g-3">
            {cards.map((c) => (
              <div key={c.id} className="col-12 col-md-6">
                <div className="rounded-4 p-3" style={{ background: "linear-gradient(135deg,#0c0c0c,#2a2a2a)", color: "#fff", minHeight: 140, position: "relative" }}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div style={{ fontSize: 12, opacity: 0.85 }}>{c.brand}</div>
                    {c.isDefault && (
                      <span className="badge" style={{ background: "#2b8a3e", color: "#fff", fontSize: 10, borderRadius: 6, padding: "4px 8px" }}>
                        Default
                      </span>
                    )}
                  </div>

                  <div style={{ letterSpacing: 2, fontSize: 14, marginBottom: 10 }}>
                    ••••&nbsp;••••&nbsp;••••&nbsp;{c.last4}
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.85 }}>{c.holder}</div>
                  <div style={{ fontSize: 12, opacity: 0.65 }}>Exp: {c.exp}</div>

                  <div className="d-flex gap-2 mt-3">
                    <button
                      className="btn btn-light"
                      style={{ height: 34, borderRadius: 10, fontSize: 12 }}
                      onClick={() => setDefaultCard(c.id)}
                    >
                      Set default
                    </button>
                    <button
                      className="btn btn-outline-light"
                      style={{ height: 34, borderRadius: 10, fontSize: 12 }}
                      onClick={() => deleteCard(c.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {cards.length === 0 && (
              <div className="text-secondary" style={{ fontSize: 12 }}>
                No cards yet.
              </div>
            )}
          </div>
        </div>
      );
    }

    if (active === "my-returns" || active === "my-cancellations") {
      const rows = active === "my-returns" ? returns : cancellations;
      const title = active === "my-returns" ? "My Returns" : "My Cancellations";

      return (
        <div className="rounded-3 p-3 p-lg-4" style={sectionCardStyle}>
          <div className="fw-semibold mb-3" style={{ fontSize: 14 }}>
            {title}
          </div>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr style={{ fontSize: 12 }}>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className="text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} style={{ fontSize: 12 }}>
                    <td className="fw-semibold">{r.id}</td>
                    <td className="text-secondary">{r.date}</td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          background:
                            r.status === "Returned"
                              ? "#0d6efd"
                              : r.status === "Cancelled"
                              ? "#dc3545"
                              : "#6c757d",
                          color: "#fff",
                          fontSize: 10,
                          borderRadius: 6,
                          padding: "5px 10px",
                        }}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="text-end fw-semibold">${r.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-secondary" style={{ fontSize: 12 }}>
            * Пока заглушка. Позже подключим реальные заказы.
          </div>
        </div>
      );
    }

    // my-wishlist
    return (
      <div className="rounded-3 p-3 p-lg-4" style={sectionCardStyle}>
        <div className="fw-semibold mb-3" style={{ fontSize: 14 }}>
          My Wishlist
        </div>

        <div className="row g-3">
          {wishlist.map((w) => (
            <div key={w.id} className="col-12 col-sm-6 col-lg-4">
              <div
                className="rounded-3 p-3 h-100"
                style={{
                  border: "1px solid #ededed",
                  background: "#fafafa",
                  position: "relative",
                }}
              >
                <button
                  type="button"
                  className="btn p-0"
                  onClick={() => removeWish(w.id)}
                  title="Remove from wishlist"
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    border: "1px solid #dedede",
                    background: "#fff",
                    fontSize: 14,
                    lineHeight: "26px",
                  }}
                >
                  ♥
                </button>

                <div className="fw-semibold" style={{ fontSize: 12, marginBottom: 10 }}>
                  {w.title}
                </div>

                <div className="fw-bold" style={{ fontSize: 16 }}>
                  ${w.price}
                </div>

                <button
                  className="btn btn-dark w-100 mt-3"
                  style={{
                    height: 40,
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  }}
                  onClick={() => alert("Added to cart (mock) ✅")}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}

          {wishlist.length === 0 && (
            <div className="text-secondary" style={{ fontSize: 12 }}>
              Wishlist is empty.
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <div className="container py-4 py-lg-5">
        <div className="mx-auto" style={{ maxWidth: 1040 }}>
          {/* Breadcrumbs */}
          <div className="mb-4" style={{ fontSize: 12, color: "#8b8b8b" }}>
            <span>Home</span>
            <span className="mx-2">/</span>
            <span style={{ color: "#111", fontWeight: 500 }}>My Account</span>
          </div>

          <div className="row g-4">
            {/* Sidebar */}
            <aside className="col-12 col-lg-3">
              <div style={{ borderRight: "1px solid #efefef" }} className="pe-lg-3">
                <div className="row g-3">
                  <div className="col-12 col-sm-6 col-lg-12">
                    <div className="mb-2" style={{ fontSize: 12, fontWeight: 600, color: "#111" }}>
                      Manage My Account
                    </div>
                    <div style={{ paddingLeft: 12 }}>
                      {menu
                        .filter((x) => x.group === "manage")
                        .map((x) => (
                          <a key={x.id} onClick={() => setActive(x.id)} style={linkStyle(active === x.id)}>
                            {x.label}
                          </a>
                        ))}
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-lg-12">
                    <div className="mb-2 mt-lg-4" style={{ fontSize: 12, fontWeight: 600, color: "#111" }}>
                      My Orders
                    </div>
                    <div style={{ paddingLeft: 12 }}>
                      {menu
                        .filter((x) => x.group === "orders")
                        .map((x) => (
                          <a key={x.id} onClick={() => setActive(x.id)} style={linkStyle(active === x.id)}>
                            {x.label}
                          </a>
                        ))}
                    </div>
                  </div>

                  <div className="col-12 col-lg-12">
                    <div className="mb-2 mt-lg-4" style={{ fontSize: 12, fontWeight: 600, color: "#111" }}>
                      My WishList
                    </div>
                    <div style={{ paddingLeft: 12 }}>
                      {menu
                        .filter((x) => x.group === "wishlist")
                        .map((x) => (
                          <a key={x.id} onClick={() => setActive(x.id)} style={linkStyle(active === x.id)}>
                            {x.label}
                          </a>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="text-secondary mt-3" style={{ fontSize: 11 }}>
                  * Сейчас всё локально (mock). Позже привяжем к API/стору.
                </div>
              </div>
            </aside>

            {/* Main */}
            <section className="col-12 col-lg-9">
              <RightPanel />
            </section>
          </div>

          <div style={{ height: 10 }} />
        </div>
      </div>
    </div>
  );
}
