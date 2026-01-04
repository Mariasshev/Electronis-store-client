"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ShippingMethod = {
  id: number;
  title: string;
  description: string;
  date: string;
};

export default function Step2Page() {
  const router = useRouter();

  const [selected, setSelected] = useState<number>(1);

  const shippingMethods: ShippingMethod[] = [
    {
      id: 1,
      title: "Free",
      description: "Regularly shipment",
      date: "17 Oct, 2023",
    },
    {
      id: 2,
      title: "$8.50",
      description: "Get your delivery as soon as possible",
      date: "1 Oct, 2023",
    },
    {
      id: 3,
      title: "Schedule",
      description: "Pick a date when you want to get your delivery",
      date: "Select Date",
    },
  ];

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <div className="container py-4 py-lg-5">
        <div className="mx-auto" style={{ maxWidth: 920 }}>
          {/* Progress */}
          <div className="d-flex align-items-center gap-4 gap-lg-5 mb-4">
            {/* Step 1 */}
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
                <div style={{ fontSize: 12 }}>Step 1</div>
                <div style={{ fontSize: 13 }}>Address</div>
              </div>
            </div>

            {/* Step 2 */}
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
                  Step 2
                </div>
                <div className="fw-semibold" style={{ fontSize: 13 }}>
                  Shipping
                </div>
              </div>
            </div>

            {/* Step 3 */}
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
                3
              </div>
              <div>
                <div style={{ fontSize: 12 }}>Step 3</div>
                <div style={{ fontSize: 13 }}>Payment</div>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="fw-semibold mb-3" style={{ fontSize: 14 }}>
            Shipment Method
          </div>

          {/* Shipping options */}
          <div className="d-flex flex-column gap-3">
            {shippingMethods.map((method) => (
              <label
                key={method.id}
                className="rounded-3 p-3 d-flex align-items-center"
                style={{
                  background: "#fff",
                  border: "1px solid #EDEDED",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  className="form-check-input me-3"
                  checked={selected === method.id}
                  onChange={() => setSelected(method.id)}
                  style={{ width: 16, height: 16 }}
                />

                <div className="flex-grow-1">
                  <div className="fw-semibold" style={{ fontSize: 13 }}>
                    {method.title}
                  </div>
                  <div className="text-secondary" style={{ fontSize: 12 }}>
                    {method.description}
                  </div>
                </div>

                <div className="text-secondary" style={{ fontSize: 12 }}>
                  {method.date}
                </div>
              </label>
            ))}
          </div>

          {/* Buttons */}
          <div className="d-flex gap-3 justify-content-end mt-4">
            <button
              className="btn btn-outline-dark w-50 w-md-auto"
              style={{ width: 140, height: 44, borderRadius: 10 }}
              onClick={() => router.push("/step-1")}
            >
              Back
            </button>

            <button
              className="btn btn-dark w-50 w-md-auto"
              style={{ width: 140, height: 44, borderRadius: 10 }}
              onClick={() => router.push("/step-3")}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
