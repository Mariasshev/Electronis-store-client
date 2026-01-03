import React from 'react';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/UI/Catalog/FilterSidebar';
import Pagination from '@/components/UI/Catalog/Pagination';
import Breadcrumbs from '@/components/Breadcrumbs';
import { IoIosArrowDown } from "react-icons/io";
import { IoChevronForward } from "react-icons/io5";
import styles from "../styles/Catalog.module.css";

// Временные данные для верстки
const products = [
    { id: 1, title: 'Apple iPhone 14 Pro 512GB Gold (MQ233)', price: 1437, img: '/img/discount/AirPodsMax.png' },
];

const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Catalog', href: '/catalog' },
    { label: 'Smartphones', href: '/catalog/smartphones' }
];

export default function CatalogPage() {
    return (
        <>

            <main className="container-lg py-4">

                <Breadcrumbs items={breadcrumbItems} />

                {/* Page Title & Sort Bar */}
                <div className="row align-items-center mb-4">
                    {/* Левая часть заголовка совпадает с шириной сайдбара */}
                    <div className="col-lg-3">
                        {/* Можно добавить заголовок фильтров, если нужно */}
                    </div>

                    <div className="col-lg-9">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <span className="text-muted">Selected Products: </span>
                                <span className="fw-bold">85</span>
                            </div>
                            <div className="dropdown">
                                <button className="btn btn-light bg-transparent border-0 dropdown-toggle" type="button">
                                    By rating <IoIosArrowDown className="ms-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* Left Sidebar */}
                    <aside className="col-lg-3 d-none d-lg-block">
                        <FilterSidebar />
                    </aside>

                    {/* Product Grid */}
                    <div className="col-lg-9">
                        <div className="row g-3"> {/* g-3 добавляет отступы между карточками */}
                            {products.map((product) => (
                                <div key={product.id} className="col-12 col-sm-6 col-md-4">
                                    {/* Передаем данные в твой ProductCard */}
                                    <ProductCard
                                        title={product.title}
                                        price={product.price}
                                        image={product.img}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Pagination Section */}
                        <Pagination />
                    </div>
                </div>
            </main>

        </>
    );
}