"use client";

import Image from "next/image";
import { useState } from "react";
import { FiHeart } from "react-icons/fi";

import styles from "../../styles/RelatedProducts.module.css";

type Item = {
  id: number;
  title: string;
  price: number;
  img: string;
};

const items: Item[] = [
  {
    id: 1,
    title: "Apple iPhone 14 Pro 512GB Gold (MQ233)",
    price: 1437,
    img: "/img/discount/Iphone14pro.png",
  },
  {
    id: 2,
    title: "AirPods Max Silver Starlight Aluminium",
    price: 549,
    img: "/img/discount/AirPodsMax.png",
  },
  {
    id: 3,
    title: "Apple Watch Series 9 GPS 41mm Starlight Aluminium",
    price: 399,
    img: "/img/discount/AppleWatchSeries9.png",
  },
  {
    id: 4,
    title: "Apple iPhone 14 Pro 1TB Gold (MQ2V3)",
    price: 1499,
    img: "/img/discount/Iphone14proTB.png",
  },
];

export default function RelatedProducts() {
  const [fav, setFav] = useState<Record<number, boolean>>({});

  const toggleFav = (id: number) => {
    setFav((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-4 py-lg-5">
      <div className="container">
        <h3 className={styles.heading}>Related Products</h3>

        <div className="row g-3 g-lg-4">
          {items.map((p) => (
            <div key={p.id} className="col-6 col-lg-3">
              <article className={styles.card}>
                <button
                  type="button"
                  className={`${styles.favBtn} ${fav[p.id] ? styles.favActive : ""}`}
                  onClick={() => toggleFav(p.id)}
                  aria-label={fav[p.id] ? "Remove from favorites" : "Add to favorites"}
                  aria-pressed={!!fav[p.id]}
                >
                  <FiHeart />
                </button>

                <div className={styles.imgWrap}>
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    className={styles.img}
                    sizes="(max-width: 992px) 45vw, 240px"
                  />
                </div>

                <div className={styles.title}>{p.title}</div>
                <div className={styles.price}>${p.price}</div>

                <button
                  type="button"
                  className={styles.buyBtn}
                  onClick={() => console.log("buy", p.id)}
                >
                  Buy Now
                </button>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
