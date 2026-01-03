"use client";

import styles from "../../styles/Breadcrumbs.module.css";

export default function Breadcrumbs() {
  return (
    <nav aria-label="breadcrumb" className={styles.wrap}>
      <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item">
          <a href="#" className={styles.link}>Home</a>
        </li>
        <li className="breadcrumb-item">
          <a href="#" className={styles.link}>Catalog</a>
        </li>
        <li className="breadcrumb-item">
          <a href="#" className={styles.link}>Smartphones</a>
        </li>
        <li className="breadcrumb-item">
          <a href="#" className={styles.link}>Apple</a>
        </li>
        <li className={`breadcrumb-item active ${styles.active}`}>
          iPhone 14 Pro Max
        </li>
      </ol>
    </nav>
  );
}
