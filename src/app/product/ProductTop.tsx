"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FiCheckCircle, FiXCircle, FiTruck, FiShield, FiHome, FiHeart } from "react-icons/fi";
import styles from "../../styles/ProductTop.module.css";

interface ProductColor {
    name: string;
    hex: string;
    quantity: number;
}

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    stockQuantity: number;
    imageUrl: string;
    gallery?: string[];
    specifications?: Record<string, string>;
    colors?: ProductColor[];
}

interface ProductTopProps {
    product: Product | null;
}

export default function ProductTop({ product }: ProductTopProps) {
    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
    const [wish, setWish] = useState(false);
    const [inCart, setInCart] = useState(false);

    // Вибір кольору за замовчуванням
    useEffect(() => {
        if (product?.colors && product.colors.length > 0) {
            setSelectedColor(product.colors[0]);
        }
    }, [product]);

    if (!product) return <div className="py-5 text-center">Loading...</div>;

    const galleryImages = (product.gallery && product.gallery.length > 0)
        ? product.gallery
        : [product.imageUrl || "/img/placeholder.png"];

    const currentImage = galleryImages[activeImgIndex];

    // Перевірка наявності
    const isAvailable = selectedColor
        ? selectedColor.quantity > 0
        : product.stockQuantity > 0;

    const currentStock = selectedColor ? selectedColor.quantity : product.stockQuantity;

    return (
        <section className={styles.section}>
            <div className="row g-4 align-items-start">

                {/* --- ГАЛЕРЕЯ --- */}
                <div className="col-12 col-lg-6">
                    <div className={styles.gallery}>
                        <div className={styles.thumbs}>
                            {galleryImages.map((src, index) => (
                                <button
                                    key={index}
                                    className={`${styles.thumb} ${index === activeImgIndex ? styles.thumbActive : ""}`}
                                    type="button"
                                    onClick={() => setActiveImgIndex(index)}
                                >
                                    <Image
                                        src={src.startsWith('http') || src.startsWith('/') ? src : '/img/placeholder.png'}
                                        alt="thumb" width={56} height={72} style={{ objectFit: "contain" }}
                                    />
                                </button>
                            ))}
                        </div>
                        <div className={styles.mainImage}>
                            <Image
                                src={currentImage.startsWith('http') || currentImage.startsWith('/') ? currentImage : '/img/placeholder.png'}
                                alt={product.name} fill className={styles.mainImg} priority style={{ objectFit: "contain" }}
                            />
                        </div>
                    </div>
                </div>

                {/* --- ІНФОРМАЦІЯ --- */}
                <div className="col-12 col-lg-6">
                    <div className={styles.info}>
                        <h1 className={styles.title}>{product.name}</h1>
                        <div className={styles.priceRow}>
                            <div className={styles.price}>${product.price}</div>
                        </div>

                        {/* --- ВИБІР КОЛЬОРУ (ВИПРАВЛЕНО) --- */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="mb-4"> {/* Відступ знизу для всього блоку */}

                                {/* Рядок 1: Назва */}
                                <div className="mb-2">
                                    <span className={styles.label}>Select color: </span>
                                    <span style={{ fontWeight: '600', marginLeft: '5px' }}>
                        {selectedColor?.name}
                    </span>
                                </div>

                                {/* Рядок 2: Самі кольори (Dots) */}
                                <div className={styles.colors} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    {product.colors.map((c) => {
                                        const isActive = selectedColor?.name === c.name;
                                        const isOutOfStock = c.quantity === 0;

                                        // Якщо колір дуже світлий (білий), додамо йому рамку, щоб його було видно
                                        const isLightColor = c.hex.toLowerCase() === '#ffffff' || c.hex.toLowerCase() === '#f2f2f2' || c.hex.toLowerCase() === '#f0f0f0';

                                        return (
                                            <button
                                                key={c.name}
                                                type="button"
                                                className={`${styles.colorDot} ${isActive ? styles.dotActive : ''}`}
                                                style={{
                                                    backgroundColor: c.hex, // <--- ОСЬ ТУТ БЕРЕТЬСЯ КОЛІР З БАЗИ
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: '50%',
                                                    border: isActive
                                                        ? '2px solid #000'
                                                        : (isLightColor ? '1px solid #ccc' : 'none'), // Рамка для світлих
                                                    opacity: isOutOfStock && !isActive ? 0.3 : 1,
                                                    cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                                                    position: 'relative',
                                                    padding: 0,
                                                    boxShadow: isActive ? '0 0 0 2px #fff inset' : 'none' // Ефект "кільця" для активного
                                                }}
                                                onClick={() => setSelectedColor(c)}
                                                title={`${c.name} (${c.quantity} available)`}
                                            >
                                                {/* Хрестик, якщо немає в наявності */}
                                                {isOutOfStock && (
                                                    <span style={{
                                                        position: 'absolute', top: '50%', left: '50%',
                                                        transform: 'translate(-50%, -50%)',
                                                        color: isLightColor ? '#000' : '#fff',
                                                        fontSize: '14px', lineHeight: 1
                                                    }}>✕</span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* СПЕЦИФІКАЦІЇ */}
                        {product.specifications && Object.keys(product.specifications).length > 0 && (
                            <div className={styles.specs}>
                                {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
                                    <div key={key} className={styles.spec}>
                                        <div className={styles.specIcon}>•</div>
                                        <div><div className={styles.specKey}>{key}</div><div className={styles.specVal}>{value}</div></div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <p className={styles.desc}>{product.description}</p>

                        {/* ДІЇ */}
                        <div className={styles.actions}>
                            <button
                                className={`${styles.wishBtn} ${wish ? styles.wishActive : ""}`}
                                onClick={() => setWish(!wish)}
                            >
                                <FiHeart />
                            </button>

                            <button
                                className={`${styles.cartBtn} ${inCart ? styles.cartActive : ""}`}
                                onClick={() => isAvailable && setInCart(!inCart)}
                                disabled={!isAvailable}
                                style={{
                                    opacity: isAvailable ? 1 : 0.6,
                                    cursor: isAvailable ? 'pointer' : 'not-allowed',
                                    background: isAvailable ? '#111' : '#555'
                                }}
                            >
                                {isAvailable ? (inCart ? "In Cart" : "Add to Cart") : "Not Available"}
                            </button>
                        </div>

                        {/* СТАТУС */}
                        <div className={styles.benefits}>
                            <div className={styles.benefit}>
                                <div className={styles.benefitIcon}><FiHome /></div>
                                <div>
                                    <div className={styles.benefitTop}>Availability</div>
                                    <div className={styles.benefitBottom}>
                                        {isAvailable
                                            ? <span className="text-success d-flex align-items-center gap-1"><FiCheckCircle/> In Stock ({currentStock})</span>
                                            : <span className="text-danger d-flex align-items-center gap-1"><FiXCircle/> Out of Stock</span>}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.benefit}>
                                <div className={styles.benefitIcon}><FiTruck /></div>
                                <div><div className={styles.benefitTop}>Delivery</div><div className={styles.benefitBottom}>1-2 days</div></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}