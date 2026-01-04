"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type CartItem = {
  id: number;
  title: string;
  sku: string;
  price: number;
  qty: number;
  img: string;
};

export default function CartPage() {
  const initialItems: CartItem[] = useMemo(
    () => [
      {
        id: 1,
        title: "Apple iPhone 14 Pro Max 128GB Deep Purple",
        sku: "#25139526913984",
        price: 1399,
        qty: 1,
        img: "/img/product/main.png",
      },
      {
        id: 2,
        title: "AirPods Max Silver",
        sku: "#53459358345",
        price: 549,
        qty: 1,
        img: "/img/discount/AirPodsMax.png",
      },
      {
        id: 3,
        title: "Apple Watch Series 9 GPS 41mm Starlight Aluminium",
        sku: "#63632324",
        price: 399,
        qty: 1,
        img: "/img/discount/AppleWatchSeries9.png",
      },
    ],
    []
  );

  const [items, setItems] = useState<CartItem[]>(initialItems);

  const tax = 50;
  const shipping = 29;

  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const total = subtotal + (items.length ? tax + shipping : 0);

  const inc = (id: number) => setItems((p) => p.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it)));
  const dec = (id: number) =>
    setItems((p) =>
      p.map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it))
    );
  const remove = (id: number) => setItems((p) => p.filter((it) => it.id !== id));

  return (
    <div style={{ background: "#fff", color: "#111", minHeight: "100vh" }}>
      <div className="container py-4 py-lg-5">
        <div className="row g-4">
          {/* LEFT */}
          <div className="col-12 col-lg-7">
            <h1 className="h4 fw-semibold mb-3 mb-lg-4">Shopping Cart</h1>

            <div className="d-flex flex-column">
              {items.map((it, idx) => (
                <div key={it.id} className={idx !== items.length - 1 ? "border-bottom pb-3 mb-3" : ""}>
                  {/* Desktop row */}
                  <div className="d-none d-md-flex align-items-center gap-3">
                    <div style={{ width: 74, height: 74, position: "relative", flex: "0 0 auto" }}>
                      <Image src={it.img} alt={it.title} fill style={{ objectFit: "contain" }} sizes="74px" />
                    </div>

                    <div className="flex-grow-1">
                      <div className="fw-medium" style={{ fontSize: 14, lineHeight: 1.2 }}>
                        {it.title}
                      </div>
                      <div className="text-secondary" style={{ fontSize: 12 }}>
                        {it.sku}
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-light border"
                        style={{ width: 32, height: 32 }}
                        onClick={() => dec(it.id)}
                      >
                        −
                      </button>

                      <div
                        className="border rounded text-center"
                        style={{ width: 40, height: 32, lineHeight: "32px", fontSize: 13, background: "#fff" }}
                      >
                        {it.qty}
                      </div>

                      <button
                        type="button"
                        className="btn btn-sm btn-light border"
                        style={{ width: 32, height: 32 }}
                        onClick={() => inc(it.id)}
                      >
                        +
                      </button>
                    </div>

                    <div className="fw-semibold" style={{ width: 70, textAlign: "right" }}>
                      ${it.price}
                    </div>

                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={() => remove(it.id)}
                      style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid transparent" }}
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Mobile row */}
                  <div className="d-flex d-md-none align-items-start gap-3">
                    <div style={{ width: 56, height: 56, position: "relative", flex: "0 0 auto" }}>
                      <Image src={it.img} alt={it.title} fill style={{ objectFit: "contain" }} sizes="56px" />
                    </div>

                    <div className="flex-grow-1">
                      <div className="fw-medium" style={{ fontSize: 12, lineHeight: 1.2, maxWidth: 180 }}>
                        {it.title}
                      </div>
                      <div className="text-secondary" style={{ fontSize: 11, marginTop: 2 }}>
                        {it.sku}
                      </div>

                      {/* controls row like in mock */}
                      <div className="d-flex align-items-center justify-content-between mt-2">
                        <div className="d-flex align-items-center gap-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-light border"
                            style={{ width: 28, height: 28, padding: 0 }}
                            onClick={() => dec(it.id)}
                          >
                            −
                          </button>

                          <div
                            className="border rounded text-center"
                            style={{ width: 34, height: 28, lineHeight: "28px", fontSize: 12, background: "#fff" }}
                          >
                            {it.qty}
                          </div>

                          <button
                            type="button"
                            className="btn btn-sm btn-light border"
                            style={{ width: 28, height: 28, padding: 0 }}
                            onClick={() => inc(it.id)}
                          >
                            +
                          </button>
                        </div>

                        <div className="fw-semibold" style={{ fontSize: 13 }}>
                          ${it.price}
                        </div>
                      </div>
                    </div>

                    {/* remove */}
                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={() => remove(it.id)}
                      style={{ width: 28, height: 28, padding: 0, borderRadius: 8, border: "1px solid transparent" }}
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}

              {!items.length && (
                <div className="text-secondary" style={{ fontSize: 14 }}>
                  Cart is empty.
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-12 col-lg-5">
            <div className="border rounded-4 p-3 p-lg-4" style={{ background: "#fff", borderColor: "#eee" }}>
              <div className="fw-semibold mb-3" style={{ fontSize: 18 }}>
                Order Summary
              </div>

              <div className="mb-3">
                <div className="text-secondary mb-2" style={{ fontSize: 12 }}>
                  Discount code / Promo code
                </div>
                <input className="form-control" placeholder="Code" style={{ height: 44, fontSize: 13 }} />
              </div>

              <div className="mb-4">
                <div className="text-secondary mb-2" style={{ fontSize: 12 }}>
                  Your bonus card number
                </div>
                <div className="input-group">
                  <input className="form-control" placeholder="Enter Card Number" style={{ height: 44, fontSize: 13 }} />
                  <button className="btn btn-outline-dark" type="button" style={{ height: 44 }}>
                    Apply
                  </button>
                </div>
              </div>

              <div className="d-flex justify-content-between mb-2" style={{ fontSize: 13 }}>
                <span className="text-secondary">Subtotal</span>
                <span className="fw-semibold">${subtotal}</span>
              </div>

              <div className="d-flex justify-content-between mb-2" style={{ fontSize: 13 }}>
                <span className="text-secondary">Estimated Tax</span>
                <span className="fw-semibold">${items.length ? tax : 0}</span>
              </div>

              <div className="d-flex justify-content-between mb-3" style={{ fontSize: 13 }}>
                <span className="text-secondary">Estimated shipping &amp; Handling</span>
                <span className="fw-semibold">${items.length ? shipping : 0}</span>
              </div>

              <div className="d-flex justify-content-between mb-4" style={{ fontSize: 14 }}>
                <span className="fw-semibold">Total</span>
                <span className="fw-semibold">${total}</span>
              </div>

              <button
                type="button"
                className="btn btn-dark w-100"
                style={{ height: 48, borderRadius: 10, fontWeight: 600 }}
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
