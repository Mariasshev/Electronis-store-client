"use client";

import Image from "next/image";
import Link from "next/link"; // 1. Імпортуємо Link
import { FiHeart } from "react-icons/fi";
import styles from "../styles/DiscountSection.module.css";

interface ProductCardProps {
    id: number; // 2. Додаємо ID, щоб знати, куди переходити
    title: string;
    price: string | number;
    image: string;
}

export default function ProductCard({ id, title, price, image }: ProductCardProps) {
    const imageUrl = image || '/img/placeholder.png';
    // Формуємо посилання: /catalog/6, /catalog/7 і т.д.
    const productUrl = `/catalog/${id}`;

    return (
        <div className={styles.card}>
            <button className={styles.favBtn} type="button" aria-label="Add to favorites">
                <FiHeart />
            </button>

            {/* 3. Обгортаємо картинку в Link */}
            <Link href={productUrl} className={styles.imgWrap} style={{ position: 'relative', height: '200px', display: 'block' }}>
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className={styles.img}
                    style={{ objectFit: 'contain' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </Link>

            <div className={styles.body}>
                {/* 4. Обгортаємо назву в Link (щоб по тексту теж можна було клікнути) */}
                <Link href={productUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={styles.name}>{title}</div>
                </Link>

                <div className={styles.price}>${price}</div>
                <button className={styles.buyBtn} type="button">Buy Now</button>
            </div>
        </div>
    );
}