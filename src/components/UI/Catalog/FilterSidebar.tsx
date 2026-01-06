"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterData {
    brands: string[];
    specifications: Record<string, string[]>; // "Color": ["Red", "Blue"]
}

export default function FilterSidebar({ categoryId }: { categoryId: string | null }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState<FilterData | null>(null);
    const [loading, setLoading] = useState(false);

    // 1. Завантажуємо доступні фільтри для категорії
    useEffect(() => {
        if (!categoryId) return;
        setLoading(true);
        fetch(`http://localhost:8080/api/filters?categoryId=${categoryId}`)
            .then(res => res.json())
            .then(data => setFilters(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [categoryId]);

    // 2. Обробка кліку по чекбоксу
    const handleFilterChange = (type: 'brand' | 'spec', key: string, value: string, checked: boolean) => {
        // Створюємо копію поточних параметрів
        const current = new URLSearchParams(Array.from(searchParams.entries()));

        const paramKey = type === 'brand' ? 'brand' : `spec_${key}`;

        if (checked) {
            // Додаємо нове значення
            current.append(paramKey, value);
        } else {
            // Видалення складніше: треба видалити саме це значення, залишивши інші такі самі ключі
            const existingValues = current.getAll(paramKey);
            // Видаляємо ключ повністю
            current.delete(paramKey);
            // Повертаємо назад ті значення, які НЕ дорівнюють тому, що ми клікнули
            existingValues
                .filter(v => v !== value)
                .forEach(v => current.append(paramKey, v));
        }

        router.push(`/catalog?${current.toString()}`);
    };

    // Перевірка, чи чекбокс активний (зчитуємо з URL)
    const isChecked = (type: 'brand' | 'spec', key: string, value: string) => {
        const paramKey = type === 'brand' ? 'brand' : `spec_${key}`;
        return searchParams.getAll(paramKey).includes(value);
    };

    if (!categoryId) return <div className="text-muted">Select a category to see filters.</div>;
    if (loading) return <div>Loading filters...</div>;
    if (!filters) return null;

    return (
        <div className="filter-sidebar pe-lg-4">
            <div className="accordion accordion-flush" id="accordionFilters">

                {/* 1. БРЕНДИ */}
                {filters.brands.length > 0 && (
                    <div className="accordion-item mb-3 border-0">
                        <h2 className="accordion-header">
                            <button className="accordion-button fw-bold bg-transparent shadow-none p-0 mb-3 text-dark"
                                    type="button" data-bs-toggle="collapse" data-bs-target="#collapseBrand">
                                Brand
                            </button>
                        </h2>
                        <div id="collapseBrand" className="accordion-collapse collapse show">
                            <div className="d-flex flex-column gap-2">
                                {filters.brands.map((brand) => (
                                    <div key={brand} className="form-check">
                                        <input
                                            className="form-check-input shadow-none bg-dark border-dark"
                                            type="checkbox"
                                            id={`brand-${brand}`}
                                            checked={isChecked('brand', 'brand', brand)}
                                            onChange={(e) => handleFilterChange('brand', 'brand', brand, e.target.checked)}
                                        />
                                        <label className="form-check-label ms-2" htmlFor={`brand-${brand}`}>{brand}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. ДИНАМІЧНІ ХАРАКТЕРИСТИКИ */}
                {Object.entries(filters.specifications).map(([specKey, values], idx) => (
                    <div key={specKey} className="accordion-item mb-3 border-0">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed fw-bold bg-transparent shadow-none p-0 mb-3 text-dark"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${idx}`}
                            >
                                {specKey}
                            </button>
                        </h2>
                        <div id={`collapse${idx}`} className="accordion-collapse collapse">
                            <div className="d-flex flex-column gap-2">
                                {values.map((val) => (
                                    <div key={val} className="form-check">
                                        <input
                                            className="form-check-input shadow-none bg-dark border-dark"
                                            type="checkbox"
                                            id={`spec-${specKey}-${val}`}
                                            checked={isChecked('spec', specKey, val)}
                                            onChange={(e) => handleFilterChange('spec', specKey, val, e.target.checked)}
                                        />
                                        <label className="form-check-label ms-2" htmlFor={`spec-${specKey}-${val}`}>{val}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}