"use client";

import { useEffect, useState } from "react";
// Додаємо іконки для краси
import { FaDollarSign, FaEuroSign, FaChartLine } from "react-icons/fa";

type Rate = { cc: string; rate: number };

export default function CurrencyTicker() {
    const [rates, setRates] = useState<Rate[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/currency")
            .then(res => res.json())
            .then(data => setRates(data))
            .catch(err => console.error(err));
    }, []);

    if (rates.length === 0) return null;

    // Стилі прямо тут для зручності (або перенесіть в CSS модуль)
    const tickerStyle = {
        borderTop: "1px solid #333",
        backgroundColor: "#0d0d0d", // Трохи темніше або світліше за футер
        padding: "12px 0",
        width: "100%"
    };

    return (
        <div style={tickerStyle}>
            <div className="container d-flex justify-content-between align-items-center">

                {/* Ліва частина - заголовок */}
                <div className="d-flex align-items-center gap-2 text-secondary small">
                    <FaChartLine className="text-success" />
                    <span className="fw-semibold text-white">Market Data (NBU)</span>
                </div>

                {/* Права частина - курси */}
                <div className="d-flex gap-4">
                    {rates.map((r) => (
                        <div key={r.cc} className="d-flex align-items-center gap-2 text-white small">
                            {/* Іконка валюти */}
                            <span className="d-flex align-items-center justify-content-center bg-dark rounded-circle" style={{width: 24, height: 24}}>
                                {r.cc === "USD" ? <FaDollarSign size={12} className="text-warning"/> : <FaEuroSign size={12} className="text-primary"/>}
                            </span>

                            <span className="text-white-50 fw-bold">{r.cc}</span>
                            <span className="fw-medium">{r.rate.toFixed(2)} ₴</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}