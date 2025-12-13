"use client";

import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import styles from "../styles/DiscountSection.module.css";

export default function Discount() {
  return (
    <section className={styles.section}>
      <div className="container py-5">
        <h2 className={styles.title}>Discounts up to -50%</h2>

        <div className="row g-4 mt-1">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className={styles.card}>
              <button className={styles.favBtn} type="button" aria-label="Add to favorites">
                <FiHeart />
              </button>

              <div className={styles.imgWrap}>
               <Image src="/img/discount/Iphone14pro.png" alt="iPhone 14 Pro" fill className={styles.img} />
              </div>

              <div className={styles.body}>
                <div className={styles.name}>Apple iPhone 14 Pro 512GB Gold (MQ233)</div>
                <div className={styles.price}>$1437</div>
                <button className={styles.buyBtn} type="button">Buy Now</button>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className={styles.card}>
              <button className={styles.favBtn} type="button" aria-label="Add to favorites">
                <FiHeart />
              </button>

              <div className={styles.imgWrap}>
              <Image src="/img/discount/AirPodsMax.png" alt="iPhone 14 Pro" fill className={styles.img} />

              </div>

              <div className={styles.body}>
                <div className={styles.name}>AirPods Max Silver Starlight Aluminium</div>
                <div className={styles.price}>$549</div>
                <button className={styles.buyBtn} type="button">Buy Now</button>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className={styles.card}>
              <button className={styles.favBtn} type="button" aria-label="Add to favorites">
                <FiHeart />
              </button>

              <div className={styles.imgWrap}>
                <Image src="/img/discount/AppleWatchSeries9.png" alt="Apple Watch" fill className={styles.img} />
              </div>

              <div className={styles.body}>
                <div className={styles.name}>Apple Watch Series 9 GPS 41mm Starlight Aluminium</div>
                <div className={styles.price}>$399</div>
                <button className={styles.buyBtn} type="button">Buy Now</button>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className={styles.card}>
              <button className={styles.favBtn} type="button" aria-label="Add to favorites">
                <FiHeart />
              </button>

              <div className={styles.imgWrap}>
                 <Image src="/img/discount/Iphone14proTB.png" alt="iPhone 14 Pro" fill className={styles.img} />
              </div>

              <div className={styles.body}>
                <div className={styles.name}>Apple iPhone 14 Pro 1TB Gold (MQ2V3)</div>
                <div className={styles.price}>$1499</div>
                <button className={styles.buyBtn} type="button">Buy Now</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
