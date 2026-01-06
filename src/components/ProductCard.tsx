"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Для переходу в корзину
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext"; // 1. Імпортуємо CartContext
import styles from "../styles/DiscountSection.module.css";
// import toast from "react-hot-toast"; // Тости вже є всередині CartContext, тут можна прибрати

interface ProductCardProps {
    id: number;
    title: string;
    price: string | number;
    image: string;
}

export default function ProductCard({ id, title, price, image }: ProductCardProps) {
    const router = useRouter();

    // --- WISHLIST ---
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const isWishlisted = isInWishlist(id);

    // --- CART (НОВЕ) ---
    const { addToCart, isInCart } = useCart();
    const isAddedToCart = isInCart(id); // Перевіряємо, чи товар вже куплений

    const imageUrl = image || '/img/placeholder.png';
    const productUrl = `/catalog/${id}`;

    // Обробник лайка
    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isWishlisted) {
            removeFromWishlist(id);
        } else {
            addToWishlist(id);
        }
    };

    // Обробник кошика (НОВЕ)
    const handleCartClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Щоб не переходило на сторінку товару

        if (isAddedToCart) {
            // Якщо вже в кошику — йдемо в кошик
            router.push('/cart');
        } else {
            // Якщо ні — додаємо
            addToCart(id);
        }
    };

    return (
        <div className={styles.card}>
            {/* Wishlist Button */}
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

            {/* Image Link */}
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

                {/* Cart Button (ОНОВЛЕНО) */}
                <button
                    className={styles.buyBtn}
                    type="button"
                    onClick={handleCartClick}
                    style={{
                        // Змінюємо стиль, якщо товар в кошику
                        backgroundColor: isAddedToCart ? "#fff" : "#111",
                        color: isAddedToCart ? "#111" : "#fff",
                        border: isAddedToCart ? "1px solid #111" : "none",
                        transition: "all 0.2s"
                    }}
                >
                    {isAddedToCart ? "In Cart" : "Buy Now"}
                </button>
            </div>
        </div>
    );
}