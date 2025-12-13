"use client";

import { useState } from "react";
import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import styles from "../styles/ProductsTabs.module.css";

type TabKey = "new" | "best" | "featured";

export default function ProductsTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("new");

  return (
    <section className={styles.section}>
      <div className="container py-5">
        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "new" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("new")}
          >
            New Arrival
          </button>
          <button
            className={`${styles.tab} ${activeTab === "best" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("best")}
          >
            Bestseller
          </button>
          <button
            className={`${styles.tab} ${activeTab === "featured" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("featured")}
          >
            Featured Products
          </button>
        </div>

        {/* Content */}
        <div className="row g-4 mt-3">
          {activeTab === "new" && <NewArrival />}
          {activeTab === "best" && <BestSeller />}
          {activeTab === "featured" && <Featured />}
        </div>
      </div>
    </section>
  );
}

/* ---------- SECTIONS ---------- */

function ProductCard({
  img,
  name,
  price,
  activeFav = false,
}: {
  img: string;
  name: string;
  price: string;
  activeFav?: boolean;
}) {
  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <article className={styles.card}>
        <button
          className={`${styles.favBtn} ${activeFav ? styles.favActive : ""}`}
          type="button"
        >
          <FiHeart />
        </button>

        <div className={styles.imgWrap}>
          <Image src={img} alt={name} fill className={styles.img} />
        </div>

        <div className={styles.name}>{name}</div>
        <div className={styles.price}>{price}</div>
        <button className={styles.buyBtn}>Buy Now</button>
      </article>
    </div>
  );
}

/* ---------- DATA (HARDCODE) ---------- */

function NewArrival() {
  return (
    <>
      <ProductCard img="/img/ProductsTabs/Iphone14pro.png" name="iPhone 14 Pro Max 128GB" price="$900" />
      <ProductCard img="/img/ProductsTabs/Blackmagic.png" name="Blackmagic Pocket Cinema 6K" price="$2535" />
      <ProductCard img="/img/ProductsTabs/AppleWatch.png" name="Apple Watch Series 9 GPS" price="$399" />
      <ProductCard img="/img/ProductsTabs/AirPodsMax.png" name="AirPods Max Silver" price="$549" />
      <ProductCard img="/img/ProductsTabs/SamsungGalaxy.png" name="Galaxy Watch6 Classic" price="$369" />
      <ProductCard img="/img/ProductsTabs/GalaxyZ.png" name="Galaxy Z Fold5" price="$1799" activeFav />
      <ProductCard img="/img/ProductsTabs/GalaxyBuds.png" name="Galaxy Buds FE" price="$99.99" />
      <ProductCard img="/img/ProductsTabs/AppleIpad.png" name="iPad 9 10.2” 64GB" price="$398" />
    </>
  );
}

function BestSeller() {
  return (
    <>

           <ProductCard img="/img/ProductsTabs/SamsungGalaxy.png" name="Galaxy Watch6 Classic" price="$369" />
           <ProductCard img="/img/ProductsTabs/GalaxyZ.png" name="Galaxy Z Fold5" price="$1799" activeFav />
           <ProductCard img="/img/ProductsTabs/GalaxyBuds.png" name="Galaxy Buds FE" price="$99.99" />
           <ProductCard img="/img/ProductsTabs/AppleIpad.png" name="iPad 9 10.2” 64GB" price="$398" />
           <ProductCard img="/img/ProductsTabs/Iphone14pro.png" name="iPhone 14 Pro Max 128GB" price="$900" />
           <ProductCard img="/img/ProductsTabs/Blackmagic.png" name="Blackmagic Pocket Cinema 6K" price="$2535" />
           <ProductCard img="/img/ProductsTabs/AppleWatch.png" name="Apple Watch Series 9 GPS" price="$399" />
           <ProductCard img="/img/ProductsTabs/AirPodsMax.png" name="AirPods Max Silver" price="$549" />
    </>
  );
}

function Featured() {
  return (
    <>
           <ProductCard img="/img/ProductsTabs/Iphone14pro.png" name="iPhone 14 Pro Max 128GB" price="$900" />
           <ProductCard img="/img/ProductsTabs/Blackmagic.png" name="Blackmagic Pocket Cinema 6K" price="$2535" />
           <ProductCard img="/img/ProductsTabs/AppleWatch.png" name="Apple Watch Series 9 GPS" price="$399" />
           <ProductCard img="/img/ProductsTabs/AirPodsMax.png" name="AirPods Max Silver" price="$549" />
           <ProductCard img="/img/ProductsTabs/SamsungGalaxy.png" name="Galaxy Watch6 Classic" price="$369" />
           <ProductCard img="/img/ProductsTabs/GalaxyZ.png" name="Galaxy Z Fold5" price="$1799" activeFav />
           <ProductCard img="/img/ProductsTabs/GalaxyBuds.png" name="Galaxy Buds FE" price="$99.99" />
           <ProductCard img="/img/ProductsTabs/AppleIpad.png" name="iPad 9 10.2” 64GB" price="$398" />
    </>
  );
}
