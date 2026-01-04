"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type SummaryItem = {
  id: number;
  title: string;
  price: number;
  emoji: string; // пока вместо картинок
};

type PayTab = "card" | "paypal" | "paypal_credit";

export default function Step3Page() {
  const router = useRouter();

  // Tabs
  const [tab, setTab] = useState<PayTab>("card");

  // Checkbox
  const [sameAsBilling, setSameAsBilling] = useState(true);

  // Form (заглушка)
  const [form, setForm] = useState({
    name: "",
    number: "",
    exp: "",
    cvv: "",
  });

  const items = useMemo<SummaryItem[]>(
    () => [
      { id: 1, title: "Apple iPhone 14 Pro Max 128Gb", price: 1399, emoji: "📱" },
      { id: 2, title: "AirPods Max Silver", price: 549, emoji: "🎧" },
      { id: 3, title: "Apple Watch Series 9 GPS 41mm", price: 399, emoji: "⌚" },
    ],
    []
  );

  const subtotal = items.reduce((acc, it) => acc + it.price, 0);
  const tax = 50;
  const shipping = 29;
  const total = subtotal + tax + shipping;

  const payDisabled =
    tab !== "card" ||
    !form.name.trim() ||
    form.number.replace(/\s/g, "").length < 12 ||
    form.exp.trim().length < 4 ||
    form.cvv.trim().length < 3;

  const onPay = () => {
    if (tab !== "card") {
      alert("PayPal / PayPal Credit — заглушка. Сейчас работаем только с Credit Card.");
      return;
    }

    if (payDisabled) {
      alert("Заполни данные карты (пока заглушка валидации).");
      return;
    }

    alert("Оплата прошла (заглушка) ✅");
    router.push("/account"); // или куда хочешь после оплаты
  };

  const TabButton = ({
    id,
    label,
  }: {
    id: PayTab;
    label: string;
  }) => {
    const active = tab === id;
    return (
      <button
        type="button"
        onClick={() => setTab(id)}
        className="btn p-0"
        style={{
          fontSize: 12,
          color: active ? "#111" : "#9a9a9a",
          fontWeight: active ? 600 : 400,
          borderBottom: active ? "2px solid #111" : "2px solid transparent",
          paddingBottom: 8,
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <div className="container py-4 py-lg-5">
        <div className="mx-auto" style={{ maxWidth: 920 }}>
          {/* Progress */}
          <div className="d-flex align-items-center gap-4 gap-lg-5 mb-4">
            {/* Step 1 */}
            <div className="d-none d-md-flex align-items-start gap-2 text-secondary">
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: "1px solid #cfcfcf",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 11,
                  marginTop: 2,
                }}
              >
                ✓
              </div>
              <div>
                <div style={{ fontSize: 12 }}>Step 1</div>
                <div style={{ fontSize: 13 }}>Address</div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="d-flex align-items-start gap-2 text-secondary">
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: "1px solid #cfcfcf",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 11,
                  marginTop: 2,
                }}
              >
                ✓
              </div>
              <div>
                <div style={{ fontSize: 12 }}>Step 2</div>
                <div style={{ fontSize: 13 }}>Shipping</div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="d-flex align-items-start gap-2">
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "#111",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 11,
                  marginTop: 2,
                }}
              >
                ✓
              </div>
              <div>
                <div className="text-secondary" style={{ fontSize: 12 }}>
                  Step 3
                </div>
                <div className="fw-semibold" style={{ fontSize: 13 }}>
                  Payment
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {/* LEFT: Summary (на мобилке скрываем как в макете) */}
            <div className="col-12 col-lg-5 d-none d-lg-block">
              <div
                className="rounded-3 p-3"
                style={{
                  border: "1px solid #EDEDED",
                  background: "#fff",
                }}
              >
                <div className="fw-semibold mb-3" style={{ fontSize: 13 }}>
                  Summary
                </div>

                <div className="d-flex flex-column gap-2 mb-3">
                  {items.map((it) => (
                    <div
                      key={it.id}
                      className="rounded-3 px-3 py-2 d-flex align-items-center"
                      style={{ background: "#F6F6F6" }}
                    >
                      <div
                        className="rounded-2 me-2"
                        style={{
                          width: 34,
                          height: 34,
                          background: "#fff",
                          display: "grid",
                          placeItems: "center",
                          border: "1px solid #eee",
                          fontSize: 16,
                        }}
                      >
                        {it.emoji}
                      </div>

                      <div className="flex-grow-1" style={{ fontSize: 12 }}>
                        {it.title}
                      </div>

                      <div className="fw-semibold" style={{ fontSize: 12 }}>
                        ${it.price}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-2">
                  <div className="text-secondary" style={{ fontSize: 11 }}>
                    Address
                  </div>
                  <div style={{ fontSize: 12 }}>
                    1131 Dusty Townline, Jacksonville, TX 40322
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-secondary" style={{ fontSize: 11 }}>
                    Shipment method
                  </div>
                  <div style={{ fontSize: 12 }}>Free</div>
                </div>

                <div className="d-flex justify-content-between mb-2" style={{ fontSize: 12 }}>
                  <div className="fw-semibold">Subtotal</div>
                  <div className="fw-semibold">${subtotal}</div>
                </div>

                <div className="d-flex justify-content-between mb-1 text-secondary" style={{ fontSize: 12 }}>
                  <div>Estimated Tax</div>
                  <div>${tax}</div>
                </div>

                <div className="d-flex justify-content-between mb-3 text-secondary" style={{ fontSize: 12 }}>
                  <div>Estimated shipping &amp; Handling</div>
                  <div>${shipping}</div>
                </div>

                <div className="d-flex justify-content-between" style={{ fontSize: 12 }}>
                  <div className="fw-semibold">Total</div>
                  <div className="fw-semibold">${total}</div>
                </div>
              </div>
            </div>

            {/* RIGHT: Payment */}
            <div className="col-12 col-lg-7">
              <div className="fw-semibold mb-2" style={{ fontSize: 14 }}>
                Payment
              </div>

              {/* Tabs */}
              <div className="d-flex gap-4 mb-3">
                <TabButton id="card" label="Credit Card" />
                <TabButton id="paypal" label="PayPal" />
                <TabButton id="paypal_credit" label="PayPal Credit" />
              </div>

              {/* Card preview */}
              <div
                className="rounded-4 mb-3"
                style={{
                  height: 170,
                  background: "linear-gradient(135deg, #0c0c0c, #2a2a2a)",
                  color: "#fff",
                  padding: 18,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* декоративные полосы */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(120deg, transparent 60%, rgba(255,255,255,0.08) 60%, transparent 72%)",
                    transform: "translateX(-20px)",
                  }}
                />

                <div style={{ position: "relative" }}>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div style={{ fontSize: 18 }}>💳</div>
                    <div style={{ fontSize: 14, opacity: 0.85 }}>)))</div>
                  </div>

                  <div style={{ letterSpacing: 2, fontSize: 16, marginBottom: 10 }}>
                    1111&nbsp;&nbsp;2222&nbsp;&nbsp;3333&nbsp;&nbsp;4444
                  </div>

                  <div className="text-secondary" style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                    Cardholder
                  </div>

                  <div style={{ position: "absolute", right: 14, bottom: 14, fontSize: 20 }}>
                    🟠🔴
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="d-flex flex-column gap-2">
                <input
                  className="form-control"
                  placeholder="Cardholder Name"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  style={{ height: 42, fontSize: 12 }}
                  disabled={tab !== "card"}
                />

                <input
                  className="form-control"
                  placeholder="Card Number"
                  value={form.number}
                  onChange={(e) => setForm((p) => ({ ...p, number: e.target.value }))}
                  style={{ height: 42, fontSize: 12 }}
                  disabled={tab !== "card"}
                />

                <div className="row g-2">
                  <div className="col-6">
                    <input
                      className="form-control"
                      placeholder="Exp.Date"
                      value={form.exp}
                      onChange={(e) => setForm((p) => ({ ...p, exp: e.target.value }))}
                      style={{ height: 42, fontSize: 12 }}
                      disabled={tab !== "card"}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      className="form-control"
                      placeholder="CVV"
                      value={form.cvv}
                      onChange={(e) => setForm((p) => ({ ...p, cvv: e.target.value }))}
                      style={{ height: 42, fontSize: 12 }}
                      disabled={tab !== "card"}
                    />
                  </div>
                </div>

                <div className="form-check mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={sameAsBilling}
                    onChange={(e) => setSameAsBilling(e.target.checked)}
                    id="sameAsBilling"
                  />
                  <label className="form-check-label" htmlFor="sameAsBilling" style={{ fontSize: 12 }}>
                    Same as billing address
                  </label>
                </div>

                {/* Buttons */}
                <div className="d-flex gap-3 justify-content-end mt-3">
                  <button
                    className="btn btn-outline-dark w-50 w-md-auto"
                    style={{ width: 140, height: 44, borderRadius: 10 }}
                    onClick={() => router.push("/step-2")}
                  >
                    Back
                  </button>

                  <button
                    className="btn btn-dark w-50 w-md-auto"
                    style={{
                      width: 140,
                      height: 44,
                      borderRadius: 10,
                      opacity: payDisabled ? 0.7 : 1,
                    }}
                    disabled={payDisabled}
                    onClick={onPay}
                  >
                    Pay
                  </button>
                </div>

                {/* small hint */}
                {tab !== "card" && (
                  <div className="text-secondary mt-2" style={{ fontSize: 12 }}>
                    PayPal / PayPal Credit — заглушка. Вёрстка есть, логика будет позже.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* чуть воздуха снизу */}
          <div style={{ height: 10 }} />
        </div>
      </div>
    </div>
  );
}
