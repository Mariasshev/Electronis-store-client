"use client";

import Image from "next/image";
import styles from "../styles/Banner.module.css";

export default function Banner() {
  return (
    <section className={styles.section}>
      {/* wrapper делает 1440 по центру, внутри — bootstrap сетка */}
      <div className={`container-xxl ${styles.bannerWrap}`}>
        <div className="row g-0">
          {/* 1 */}
          <div className="col-12 col-md-6 col-lg-3">
            <article className={`${styles.card} ${styles.cardGray}`}>
              <div className={styles.media}>
                <Image src="/img/banner/popular.png" alt="Popular Products" fill className={styles.img} />
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>Popular Products</h3>
                <p className={styles.text}>
                  iPad combines a magnificent 10.2-inch Retina display, incredible performance,
                  multitasking and ease of use.
                </p>
                <button className={styles.btn} type="button">Shop Now</button>
              </div>
            </article>
          </div>

          {/* 2 */}
          <div className="col-12 col-md-6 col-lg-3">
            <article className={`${styles.card} ${styles.cardWhite}`}>
              <div className={styles.media}>
                <Image src="/img/banner/ipad.png" alt="Ipad Pro" fill className={styles.img} />
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>Ipad Pro</h3>
                <p className={styles.text}>
                  iPad combines a magnificent 10.2-inch Retina display, incredible performance,
                  multitasking and ease of use.
                </p>
                <button className={styles.btn} type="button">Shop Now</button>
              </div>
            </article>
          </div>

          {/* 3 */}
          <div className="col-12 col-md-6 col-lg-3">
            <article className={`${styles.card} ${styles.cardGray}`}>
              <div className={styles.media}>
                <Image src="/img/banner/sumsung.png" alt="Samsung Galaxy" fill className={styles.img} />
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>Samsung Galaxy</h3>
                <p className={styles.text}>
                  iPad combines a magnificent 10.2-inch Retina display, incredible performance,
                  multitasking and ease of use.
                </p>
                <button className={styles.btn} type="button">Shop Now</button>
              </div>
            </article>
          </div>

          {/* 4 dark */}
          <div className="col-12 col-md-6 col-lg-3">
            <article className={`${styles.card} ${styles.cardDark}`}>
              <div className={styles.media}>
                <Image src="/img/banner/macbook.png" alt="Macbook Pro" fill className={styles.img} />
              </div>
              <div className={styles.content}>
                <h3 className={`${styles.title} ${styles.titleDark}`}>Macbook Pro</h3>
                <p className={`${styles.text} ${styles.textDark}`}>
                  iPad combines a magnificent 10.2-inch Retina display, incredible performance,
                  multitasking and ease of use.
                </p>
                <button className={`${styles.btn} ${styles.btnDark}`} type="button">Shop Now</button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
