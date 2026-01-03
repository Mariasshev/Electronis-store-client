"use client";

import styles from "../styles/DiscountSection.module.css";
import ProductCard from "./ProductCard";

const products = [
    {
        id: 1,
        title: "Apple iPhone 14 Pro 512GB Gold (MQ233)",
        price: "$1437",
        image: "/img/discount/Iphone14pro.png",
    },
    {
        id: 2,
        title: "AirPods Max Silver Starlight Aluminium",
        price: "$549",
        image: "/img/discount/AirPodsMax.png",
    },
    {
        id: 3,
        title: "Apple Watch Series 9 GPS 41mm Starlight Aluminium",
        price: "$399",
        image: "/img/discount/AppleWatchSeries9.png",
    },
    {
        id: 4,
        title: "Apple iPhone 14 Pro 1TB Gold (MQ2V3)",
        price: "$1499",
        image: "/img/discount/Iphone14proTB.png",
    },
];

export default function Discount() {
    return (
        <section className={styles.section}>
            <div className="container py-5">
                <h2 className={styles.title}>Discounts up to -50%</h2>

                <div className="row g-4 mt-1">
                    {products.map((product) => (
                        <div key={product.id} className="col-12 col-sm-6 col-lg-3">
                            <ProductCard
                                title={product.title}
                                price={product.price}
                                image={product.image}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
