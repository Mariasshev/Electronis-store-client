"use client";

import styles from "../styles/SaleBanner.module.css";

export default function SaleBanner() {
  return (
    <section className={styles.section}>
      <div className={`container-fluid ${styles.wrap}`}>
        <div className={styles.banner}>
          <div className={styles.overlay} />

          <div className={styles.content}>
            <h2 className={styles.title}>
              <span className={styles.titleLight}>Big Summer</span>{" "}
              <span className={styles.titleBold}>Sale</span>
            </h2>

            <p className={styles.subtitle}>
              Commodo fames vitae vitae leo mauris in. Eu consequat.
            </p>

            <button className={styles.btn} type="button">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
