"use client";

import Image from "next/image";
import { useState } from "react"; // Прибираємо useEffect, він тут не потрібен
import { FiCheckCircle, FiXCircle, FiTruck, FiHome, FiHeart } from "react-icons/fi";
import styles from "../../styles/ProductTop.module.css";

interface ProductMemory {
    id?: number;
    size: string;
    quantity: number;
    priceModifier: number;
}

interface ProductColor {
    name: string;
    hex: string;
    quantity: number;
    priceModifier?: number;
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
    memoryOptions?: ProductMemory[];
}

interface ProductTopProps {
    product: Product | null;
}

export default function ProductTop({ product }: ProductTopProps) {

    console.log("PRODUCT DATA FROM SERVER:", product);
    console.log("MEMORY OPTIONS:", product?.memoryOptions);

    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const [wish, setWish] = useState(false);
    const [inCart, setInCart] = useState(false);

    // Стейт для РУЧНОГО вибору користувача
    const [userSelectedColor, setUserSelectedColor] = useState<ProductColor | null>(null);
    const [userSelectedMemory, setUserSelectedMemory] = useState<ProductMemory | null>(null);

    if (!product) return <div className="py-5 text-center">Loading...</div>;

    // --- ЛОГІКА "DERIVED STATE" (ВИРІШЕННЯ ПОМИЛКИ) ---
    // Якщо користувач вибрав - беремо його вибір.
    // Якщо ні - беремо перший елемент із масиву (дефолтний).
    const activeColor = userSelectedColor || (product.colors && product.colors.length > 0 ? product.colors[0] : null);
    const activeMemory = userSelectedMemory || (product.memoryOptions && product.memoryOptions.length > 0 ? product.memoryOptions[0] : null);

    const galleryImages = (product.gallery && product.gallery.length > 0)
        ? product.gallery
        : [product.imageUrl || "/img/placeholder.png"];

    const currentImage = galleryImages[activeImgIndex];

    // --- ЛОГІКА НАЯВНОСТІ ---
    const isColorAvailable = activeColor ? activeColor.quantity > 0 : true;
    const isMemoryAvailable = activeMemory ? activeMemory.quantity > 0 : true;

    const isAvailable = (product.colors?.length ? isColorAvailable : true) &&
        (product.memoryOptions?.length ? isMemoryAvailable : true) &&
        product.stockQuantity > 0;

    // Скільки товару в наявності для поточної комбінації
    const currentStock = activeMemory ? activeMemory.quantity : (activeColor ? activeColor.quantity : product.stockQuantity);

    // --- ЛОГІКА ЦІНИ ---
    const finalPrice = product.price + (activeMemory?.priceModifier || 0);


    return (
        <section className={styles.section}>
            <div className="row g-4 align-items-start">


                {/* ГАЛЕРЕЯ */}
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
                                        src={src.startsWith('http') || src.startsWith('/') ? src : `/${src}`}
                                        alt="thumb" width={56} height={72} style={{ objectFit: "contain" }}
                                    />
                                </button>
                            ))}
                        </div>
                        <div className={styles.mainImage}>
                            <Image
                                src={currentImage.startsWith('http') || currentImage.startsWith('/') ? currentImage : `/${currentImage}`}
                                alt={product.name} fill className={styles.mainImg} priority style={{ objectFit: "contain" }}
                            />
                        </div>
                    </div>
                </div>

                {/* ІНФОРМАЦІЯ */}
                <div className="col-12 col-lg-6">
                    <div className={styles.info}>
                        <h1 className={styles.title}>{product.name}</h1>
                        <div className={styles.priceRow}>
                            <div className={styles.price}>${finalPrice}</div>
                        </div>

                        {/* --- ВИБІР КОЛЬОРУ --- */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="mb-4">
                                <div className="mb-2">
                                    <span className={styles.label}>Select color: </span>
                                    <span style={{ fontWeight: '600', marginLeft: '5px' }}>
                                        {activeColor?.name}
                                    </span>
                                </div>
                                <div className={styles.colors} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    {product.colors.map((c) => {
                                        const isActive = activeColor?.name === c.name;
                                        const isOutOfStock = c.quantity === 0;
                                        const isLightColor = ['#ffffff', '#f2f2f2', '#f0f0f0'].includes(c.hex.toLowerCase());

                                        return (
                                            <button
                                                key={c.name}
                                                type="button"
                                                className={`${styles.colorDot} ${isActive ? styles.dotActive : ''}`}
                                                style={{
                                                    backgroundColor: c.hex,
                                                    width: '32px', height: '32px', borderRadius: '50%',
                                                    border: isActive ? '2px solid #000' : (isLightColor ? '1px solid #ccc' : 'none'),
                                                    opacity: isOutOfStock && !isActive ? 0.3 : 1,
                                                    cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                                                    position: 'relative', padding: 0,
                                                    boxShadow: isActive ? '0 0 0 2px #fff inset' : 'none'
                                                }}
                                                // ТУТ ОНОВЛЮЄМО СТЕЙТ КОРИСТУВАЧА
                                                onClick={() => setUserSelectedColor(c)}
                                                title={`${c.name} (${c.quantity} available)`}
                                            >
                                                {isOutOfStock && (
                                                    <span style={{
                                                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                                        color: isLightColor ? '#000' : '#fff', fontSize: '14px', lineHeight: 1
                                                    }}>✕</span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* --- ВИБІР ПАМ'ЯТІ --- */}
                        {product.memoryOptions && product.memoryOptions.length > 0 && (
                            <div className="mb-4">
                                <div className="mb-2">
                                    <span className={styles.label}>Select storage: </span>
                                    <span style={{ fontWeight: '600', marginLeft: '5px' }}>
                                        {activeMemory?.size}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    {product.memoryOptions.map((mem) => {
                                        // Порівнюємо по size
                                        const isActive = activeMemory?.size === mem.size;
                                        const isOutOfStock = mem.quantity === 0;

                                        return (
                                            <button
                                                key={mem.size}
                                                type="button"
                                                style={{
                                                    border: isActive ? '2px solid #000' : '1px solid #dee2e6',
                                                    backgroundColor: isActive ? '#000' : '#fff',
                                                    color: isActive ? '#fff' : '#212529',
                                                    padding: '8px 16px',
                                                    borderRadius: '8px',
                                                    fontWeight: '500',
                                                    fontSize: '14px',
                                                    opacity: isOutOfStock && !isActive ? 0.5 : 1,
                                                    cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                // ТУТ ОНОВЛЮЄМО СТЕЙТ КОРИСТУВАЧА
                                                onClick={() => setUserSelectedMemory(mem)}
                                                disabled={isOutOfStock}
                                            >
                                                {mem.size}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* ХАРАКТЕРИСТИКИ */}
                        {product.specifications && Object.keys(product.specifications).length > 0 && (
                            <div className={styles.specs}>
                                {Object.entries(product.specifications).map(([key, value]) => (
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