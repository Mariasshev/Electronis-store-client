"use client";

import Image from "next/image";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "@/context/WishlistContext";
import styles from "../styles/DiscountSection.module.css";
import toast from "react-hot-toast";

interface ProductCardProps {
    id: number;
    title: string;
    price: string | number;
    image: string;
}

export default function ProductCard({ id, title, price, image }: ProductCardProps) {
    // Беремо функції з глобального контексту
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

    // Перевіряємо, чи цей конкретний товар є в списку улюблених
    const isWishlisted = isInWishlist(id);
    const imageUrl = image || '/img/placeholder.png';
    const productUrl = `/catalog/${id}`;

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isWishlisted) {
            removeFromWishlist(id);
        } else {
            addToWishlist(id);
        }
    };

    return (
        <div className={styles.card}>
            <button
                className={styles.favBtn}
                type="button"
                onClick={handleWishlistClick}
                style={{
                    color: isWishlisted ? "#ff0000" : "inherit",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    zIndex: 10
                }}
            >
                {isWishlisted ? <FaHeart /> : <FiHeart />}
            </button>

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
                <Link href={productUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={styles.name}>{title}</div>
                </Link>

                <div className={styles.price}>${price}</div>

                <button
                    className={styles.buyBtn}
                    type="button"
                    onClick={() => toast.success("Added to Cart (Demo)")}
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
}