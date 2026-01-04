"use client";

import React, { JSX, useRef, useState, useEffect } from "react";
import Link from "next/link"; // 1. Импортируем Link

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import styles from "../styles/BrowseCategories.module.css";

// Icons
import {
    FaMobileAlt,
    FaHeadphones,
    FaLaptop,
    FaCamera,
    FaGamepad,
    FaClock,
} from "react-icons/fa";

interface CategoryItem {
    id: number; // Добавляем ID из БД
    icon: JSX.Element;
    label: string;
}

export default function BrowseCategories() {
    // 2. Прописываем ID (они должны совпадать с БД!)
    const categories: CategoryItem[] = [
        { id: 1, icon: <FaMobileAlt />, label: "Phones" },
        { id: 2, icon: <FaLaptop />, label: "Computers" },
        { id: 3, icon: <FaClock />, label: "Smart Watches" },
        { id: 4, icon: <FaCamera />, label: "Cameras" },
        { id: 5, icon: <FaHeadphones />, label: "Headphones" },
        { id: 6, icon: <FaGamepad />, label: "Gaming" },
        // Повторяющиеся убрал для примера, но если нужны для слайдера - добавь с правильными ID
    ];

    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    const [navigation, setNavigation] = useState<{ prevEl: HTMLButtonElement | null; nextEl: HTMLButtonElement | null }>({
        prevEl: null,
        nextEl: null,
    });

    useEffect(() => {
        setNavigation({
            prevEl: prevRef.current,
            nextEl: nextRef.current,
        });
    }, []);

    return (
        <section className={styles.section}>
            <div className="container-lg">
                <div className={styles.header}>
                    <h3 className={styles.h}>Browse By Category</h3>
                    <div className={styles.arrows}>
                        <button ref={prevRef} className={styles.arrowBtn}>‹</button>
                        <button ref={nextRef} className={styles.arrowBtn}>›</button>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation]}
                    navigation={navigation}
                    spaceBetween={16}
                    slidesPerView={2}
                    breakpoints={{
                        576: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        992: { slidesPerView: 5 },
                        1200: { slidesPerView: 6 },
                    }}
                >
                    {categories.map((item, index) => (
                        <SwiperSlide key={index}>
                            {/* 3. Оборачиваем карточку в Link */}
                            {/* Передаем ID категории в URL */}
                            <Link href={`/catalog?categoryId=${item.id}`} style={{ textDecoration: 'none' }}>
                                <div className={styles.card}>
                                    <div className={styles.icon}>{item.icon}</div>
                                    <span className={styles.category}>{item.label}</span>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}