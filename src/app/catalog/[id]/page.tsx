"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductTop from "@/app/product/ProductTop";
import ProductDetails from "@/app/product/ProductDetails";

// Оновлюємо інтерфейс
interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    stockQuantity: number;
    imageUrl: string;

    // --- ВАЖЛИВО: Додаємо ці поля, щоб TypeScript їх бачив ---
    categoryId?: number; // Знак питання означає, що поле може бути (а може й ні)
    categoryName?: string;
    brandName?: string;

    // ... інші поля
    gallery?: string[];
    specifications?: Record<string, string>;
    colors?: any[];
}

export default function ProductPage() {
    const params = useParams();
    const id = params.id;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:8080/api/products?id=${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Product not found");
                return res.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="container py-5">Loading...</div>;
    if (!product) return <div className="container py-5">Product not found</div>;

    // ФОРМУЄМО ДИНАМІЧНИЙ ШЛЯХ
    // Додаємо тип явно: { label: string; href?: string }[]
    const breadcrumbItems: { label: string; href?: string }[] = [
        { label: "Home", href: "/" },
        { label: "Catalog", href: "/catalog" },
    ];

    // 1. Якщо є категорія — додаємо її
    if (product.categoryName) {
        breadcrumbItems.push({
            label: product.categoryName,
            // Тепер TypeScript не буде сваритися, бо ми додали categoryId в інтерфейс
            href: `/catalog?categoryId=${product.categoryId || ''}`
        });
    }

    // 2. Якщо є бренд — додаємо його
    if (product.brandName) {
        breadcrumbItems.push({
            label: product.brandName,
            href: "#" // Заглушка, поки немає фільтру по брендах
        });
    }

    // 3. Назва товару
    breadcrumbItems.push({ label: product.name });

    return (
        <div style={{ background: "#fff", color: "#111", minHeight: "100vh" }}>
            <div className="container-lg py-4 py-lg-5">

                <Breadcrumbs items={breadcrumbItems} />

                {/* Якщо ProductTop підсвічує помилку типів, додай перевірку product as any або онови типи в ProductTop */}
                <ProductTop product={product} />

                <div className="mt-5">
                    <ProductDetails description={product.description} />
                </div>
            </div>
        </div>
    );
}