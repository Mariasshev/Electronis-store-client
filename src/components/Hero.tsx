import styles from "../styles/Hero.module.css";
import Image from "next/image";
import heroImg from "../images/MainPage/hero-img.png";

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className="container-lg d-flex align-items-center justify-content-between">
                <div className={styles.content}>
                    <p className={styles.subtitle}>Pro.Beyond.</p>
                    <h1 className={styles.title}>
                        IPhone 14 <strong className="fw-bold">Pro</strong>
                    </h1>
                    <p className={styles.description}>
                        Created to change everything for the better. For everyone
                    </p>
                    <button className={styles.shopBtn}>Shop Now</button>
                </div>

                <div className={styles.imageWrapper}>
                    <Image src={heroImg} className={styles.image} alt="..." fill />
                </div>
            </div>
        </section>


    );
}
