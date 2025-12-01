"use client";

import React, { JSX, useRef, useState, useEffect } from "react";

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
    icon: JSX.Element;
    label: string;
}

export default function BrowseCategories() {
    const categories: CategoryItem[] = [
        { icon: <FaMobileAlt />, label: "Phones" },
        { icon: <FaClock />, label: "Smart Watches" },
        { icon: <FaCamera />, label: "Cameras" },
        { icon: <FaHeadphones />, label: "Headphones" },
        { icon: <FaLaptop />, label: "Computers" },
        { icon: <FaGamepad />, label: "Gaming" },
        { icon: <FaClock />, label: "Smart Watches" },
        { icon: <FaCamera />, label: "Cameras" },
        { icon: <FaHeadphones />, label: "Headphones" },
        { icon: <FaLaptop />, label: "Computers" },
        { icon: <FaGamepad />, label: "Gaming" },
    ];

    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    // состояние для хранения навигации после рендера
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

                {/* Заголовок и стрелки в одной строке */}
                <div className={styles.header}>
                    <h3 className={styles.h}>Browse By Category</h3>

                    <div className={styles.arrows}>
                        <button ref={prevRef} className={styles.arrowBtn}>‹</button>
                        <button ref={nextRef} className={styles.arrowBtn}>›</button>
                    </div>
                </div>

                {/* Swiper */}
                <Swiper
                    modules={[Navigation]}
                    navigation={navigation} // используем состояние после рендера
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
                            <div className={styles.card}>
                                <div className={styles.icon}>{item.icon}</div>
                                <span className={styles.category}>{item.label}</span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </section>
    );
}
