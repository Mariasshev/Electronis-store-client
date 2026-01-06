"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

interface SearchProduct {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchProduct[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Debounce: чекаємо 300мс після того, як юзер перестав друкувати
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.length > 1) { // Шукаємо, якщо введено хоча б 2 букви
                fetch(`http://localhost:8080/api/products?q=${query}`)
                    .then(res => res.json())
                    .then(data => {
                        setResults(data);
                        setIsOpen(true);
                    })
                    .catch(err => console.error(err));
            } else {
                setResults([]);
                setIsOpen(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Закриваємо пошук, якщо клікнули за межами компонента
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Обробка натискання Enter
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            // Можна зробити сторінку результатів пошуку, але поки просто закриваємо
            setIsOpen(false);
        }
    };

    const handleLinkClick = () => {
        setIsOpen(false);
        setQuery(""); // Очищаємо поле після переходу
    };

    return (
        <div className="col d-none d-md-block px-3 position-relative" ref={wrapperRef}>
            <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                    <FiSearch />
                </span>
                <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => { if(results.length > 0) setIsOpen(true); }}
                />
            </div>

            {/* ВИПАДАЮЧИЙ СПИСОК */}
            {isOpen && results.length > 0 && (
                <div
                    className="position-absolute bg-white shadow rounded-bottom w-100 start-0 border"
                    style={{ zIndex: 1000, marginTop: "2px", overflow: "hidden" }}
                >
                    {results.map((product) => (
                        <Link
                            key={product.id}
                            href={`/catalog/${product.id}`}
                            className="d-flex align-items-center gap-3 p-2 text-decoration-none border-bottom hover-bg-light"
                            onClick={handleLinkClick}
                            style={{ color: "inherit", transition: "background 0.2s" }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9fa"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                        >
                            <div style={{ width: "40px", height: "40px", position: "relative", flexShrink: 0 }}>
                                <Image
                                    src={product.imageUrl || "/img/placeholder.png"}
                                    alt={product.name}
                                    fill
                                    style={{ objectFit: "contain" }}
                                />
                            </div>
                            <div className="d-flex flex-column" style={{ overflow: "hidden" }}>
                                <span className="text-truncate fw-medium" style={{ fontSize: "14px" }}>
                                    {product.name}
                                </span>
                                <span className="text-muted small">
                                    ${product.price}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {isOpen && query.length > 1 && results.length === 0 && (
                <div
                    className="position-absolute bg-white shadow rounded-bottom w-100 start-0 border p-3 text-center text-muted"
                    style={{ zIndex: 1000, marginTop: "2px" }}
                >
                    No products found
                </div>
            )}
        </div>
    );
}