"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Address = {
  id: number;
  title: string;
  tag: "HOME" | "OFFICE";
  line1: string;
  phone: string;
};

export default function Step1Page() {
  const router = useRouter();

  const addresses = useMemo<Address[]>(
    () => [
      {
        id: 1,
        title: "2118 Thornridge",
        tag: "HOME",
        line1: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
        phone: "(209) 555-0104",
      },
      {
        id: 2,
        title: "Headoffice",
        tag: "OFFICE",
        line1: "2715 Ash Dr. San Jose, South Dakota 83475",
        phone: "(704) 555-0127",
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState<number>(1);

  const goBack = () => router.push("/cart");
  const goNext = () => router.push("/step-2");

  return (
    <div style={{ background: "#fff", color: "#111", minHeight: "100vh" }}>
      <div className="container py-4 py-lg-5">
        {/* ограничиваем ширину как в фигме */}
        <div className="mx-auto" style={{ maxWidth: 920 }}>
          {/* Progress */}
          <div className="d-flex align-items-center gap-4 gap-lg-5 mb-4">
            {/* Step 1 */}
            <div className="d-flex align-items-start gap-2">
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 999,
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
              <div style={{ lineHeight: 1.1 }}>
                <div className="text-secondary" style={{ fontSize: 12 }}>
                  Step 1
                </div>
                <div className="fw-semibold" style={{ fontSize: 13 }}>
                  Address
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="d-flex align-items-start gap-2">
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 999,
                  border: "1px solid #cfcfcf",
                  color: "#cfcfcf",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 11,
                  marginTop: 2,
                }}
              >
                2
              </div>
              <div style={{ lineHeight: 1.1 }}>
                <div className="text-secondary" style={{ fontSize: 12 }}>
                  Step 2
                </div>
                <div className="text-secondary" style={{ fontSize: 13 }}>
                  Shipping
                </div>
              </div>
            </div>

            {/* Step 3 (на мобилке скрываем) */}
            <div className="d-none d-md-flex align-items-start gap-2">
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 999,
                  border: "1px solid #cfcfcf",
                  color: "#cfcfcf",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 11,
                  marginTop: 2,
                }}
              >
                3
              </div>
              <div style={{ lineHeight: 1.1 }}>
                <div className="text-secondary" style={{ fontSize: 12 }}>
                  Step 3
                </div>
                <div className="text-secondary" style={{ fontSize: 13 }}>
                  Payment
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="fw-semibold mb-3" style={{ fontSize: 14 }}>
            Select Address
          </div>

          {/* Address list */}
          <div className="d-flex flex-column gap-3">
            {addresses.map((a) => {
              const active = a.id === selectedId;

              return (
                <label
                  key={a.id}
                  className="rounded-3 p-3 d-flex align-items-start"
                  style={{
                    background: "#F6F6F6",
                    cursor: "pointer",
                    border: "1px solid #EFEFEF",
                  }}
                >
                  {/* radio */}
                  <div className="form-check" style={{ minWidth: 26 }}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="address"
                      checked={active}
                      onChange={() => setSelectedId(a.id)}
                      style={{
                        marginTop: 6,
                        width: 16,
                        height: 16,
                        borderColor: "#111",
                      }}
                    />
                  </div>

                  {/* text */}
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <div className="fw-semibold" style={{ fontSize: 13 }}>
                        {a.title}
                      </div>

                      <span
                        style={{
                          fontSize: 10,
                          padding: "2px 10px",
                          borderRadius: 6,
                          background: "#111",
                          color: "#fff",
                          fontWeight: 600,
                          letterSpacing: 0.4,
                        }}
                      >
                        {a.tag}
                      </span>
                    </div>

                    <div className="text-secondary" style={{ fontSize: 12, lineHeight: 1.35 }}>
                      {a.line1}
                    </div>

                    <div className="text-secondary" style={{ fontSize: 12, marginTop: 4 }}>
                      {a.phone}
                    </div>
                  </div>

                  {/* icons */}
                  <div className="d-flex align-items-center gap-3" style={{ paddingLeft: 10 }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log("edit address", a.id);
                      }}
                      className="btn p-0"
                      style={{
                        width: 22,
                        height: 22,
                        lineHeight: "22px",
                        fontSize: 16,
                      }}
                      aria-label="Edit address"
                      title="Edit"
                    >
                      ✎
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log("delete address", a.id);
                      }}
                      className="btn p-0"
                      style={{
                        width: 22,
                        height: 22,
                        lineHeight: "22px",
                        fontSize: 16,
                      }}
                      aria-label="Delete address"
                      title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Add new address */}
          <div className="my-4">
            <div style={{ borderTop: "1px solid #E9E9E9", paddingTop: 18 }}>
              <button
                type="button"
                className="btn d-flex align-items-center gap-2 mx-auto"
                style={{ fontSize: 12, color: "#111" }}
                onClick={() => alert("Add New Address (пока заглушка)")}
              >
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 999,
                    background: "#111",
                    color: "#fff",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  +
                </span>
                Add New Address
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex gap-3 justify-content-end">
            <button
              type="button"
              className="btn btn-outline-dark w-50 w-md-auto"
              style={{ width: 140, height: 44, borderRadius: 10 }}
              onClick={goBack}
            >
              Back
            </button>

            <button
              type="button"
              className="btn btn-dark w-50 w-md-auto"
              style={{ width: 140, height: 44, borderRadius: 10 }}
              onClick={goNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
