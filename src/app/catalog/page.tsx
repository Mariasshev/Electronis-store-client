'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/UI/Catalog/FilterSidebar';
import Pagination from '@/components/UI/Catalog/Pagination';
import Breadcrumbs from '@/components/Breadcrumbs';

// 1. Оновлюємо інтерфейс (додаємо categoryName)
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    imageUrl: string;
    categoryName?: string; // <--- Нове поле
}

export default function CatalogPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const searchParams = useSearchParams();
    const categoryId = searchParams.get('categoryId');

    // 2. Формуємо хлібних крихти
    // Вказуємо тип явно, щоб TS дозволяв елементи без href
    const breadcrumbItems: { label: string; href?: string }[] = [
        { label: 'Home', href: '/' },
        { label: 'Catalog', href: '/catalog' }, // Спочатку це активна сторінка
    ];

    // ЛОГІКА: Якщо ми вибрали категорію і товари завантажились
    if (categoryId && products.length > 0 && products[0].categoryName) {
        // а) Робимо посилання "Catalog" активним (щоб можна було повернутися до всіх товарів)
        breadcrumbItems[1].href = '/catalog';

        // б) Додаємо назву категорії (наприклад, "Smartphones")
        breadcrumbItems.push({
            label: products[0].categoryName,
            // href не потрібен, бо ми вже на цій сторінці
        });
    }

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                let url = 'http://localhost:8080/api/products';
                if (categoryId) {
                    url += `?categoryId=${categoryId}`;
                }

                const response = await fetch(url);
                if (!response.ok) throw new Error('Ошибка сети');

                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Не удалось загрузить товары:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);

    return (
        <main className="container-lg py-4">
            {/* Передаємо оновлені крихти */}
            <Breadcrumbs items={breadcrumbItems} />

            <div className="row align-items-center mb-4">
                <div className="col-lg-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <span className="text-muted">Found Products: </span>
                            <span className="fw-bold">{products.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <aside className="col-lg-3 d-none d-lg-block">
                    <FilterSidebar />
                </aside>

                <div className="col-lg-9">
                    {isLoading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="row g-3">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <div key={product.id} className="col-12 col-sm-6 col-md-4">
                                        <ProductCard
                                            id={product.id}
                                            title={product.name}
                                            price={product.price}
                                            image={product.imageUrl}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center py-5">
                                    <h4>No products found</h4>
                                    <p className="text-muted">Try selecting a different category.</p>
                                </div>
                            )}
                        </div>
                    )}
                    <Pagination />
                </div>
            </div>
        </main>
    );
}