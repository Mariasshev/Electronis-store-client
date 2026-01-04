"use client";

import styles from "../../styles/ProductDetails.module.css";

interface ProductDetailsProps {
    description: string;
}

export default function ProductDetails({ description }: ProductDetailsProps) {
    return (
        <section className={styles.section}>
            <div className={styles.card}>
                <h2 className={styles.title}>Details</h2>
                <p className={styles.lead}>
                    {description}
                </p>
            </div>
        </section>
    );
}