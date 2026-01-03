"use client";

import Image from "next/image";
import { FiHeart } from "react-icons/fi";
// Обрати внимание на путь к стилям. Если компонент будет использоваться везде,
// лучше создать для него свой ProductCard.module.css, но пока оставим твой.
import styles from "../styles/DiscountSection.module.css";

interface ProductCardProps {
    title: string;
    price: string | number;
    image: string;
    // id не обязателен для рендера самой карточки, но нужен для key в списке
}

export default function ProductCard({ title, price, image }: ProductCardProps) {
    return (
        <div className={styles.card}>
            <button className={styles.favBtn} type="button" aria-label="Add to favorites">
                <FiHeart />
            </button>

            <div className={styles.imgWrap}>
                {/* Добавил objectFit, чтобы картинка корректно вписывалась */}
                <Image
                    src={image}
                    alt={title}
                    fill
                    className={styles.img}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <div className={styles.body}>
                <div className={styles.name}>{title}</div>
                <div className={styles.price}>{price}</div>
                <button className={styles.buyBtn} type="button">Buy Now</button>
            </div>
        </div>
    );
}