"use client";

import Image from "next/image";
import styles from "../styles/Banner.module.css";

type Variant = "gray" | "white" | "dark";

function BannerCard({
  variant,
  img,
  title,
  text,
}: {
  variant: Variant;
  img: string;
  title: string;
  text: string;
}) {
  const cardClass =
    variant === "white"
      ? `${styles.card} ${styles.cardWhite}`
      : variant === "dark"
      ? `${styles.card} ${styles.cardDark}`
      : `${styles.card} ${styles.cardGray}`;

  const titleClass = variant === "dark" ? `${styles.title} ${styles.titleDark}` : styles.title;
  const textClass = variant === "dark" ? `${styles.text} ${styles.textDark}` : styles.text;
  const btnClass = variant === "dark" ? `${styles.btn} ${styles.btnDark}` : styles.btn;

  return (
    <article className={cardClass}>
      <div className={styles.media}>
        <Image src={img} alt={title} fill className={styles.img} />
      </div>

      <div className={styles.content}>
        <h3 className={titleClass}>{title}</h3>
        <p className={textClass}>{text}</p>
        <button className={btnClass} type="button">
          Shop Now
        </button>
      </div>
    </article>
  );
}

export default function Banner() {
  const text =
    "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.";

  return (
    <section className={styles.section}>
      <div className={`container-lg ${styles.bannerWrap}`}>
        <div className="d-none d-sm-block">
          <div className="row g-0">
            <div className="col-lg-3">
              <BannerCard variant="gray" img="/img/banner/popular.png" title="Popular Products" text={text} />
            </div>

            <div className="col-lg-3">
              <BannerCard variant="white" img="/img/banner/ipad.png" title="Ipad Pro" text={text} />
            </div>

            <div className="col-lg-3">
              <BannerCard variant="gray" img="/img/banner/sumsung.png" title="Samsung Galaxy" text={text} />
            </div>

            <div className="col-lg-3">
              <BannerCard variant="dark" img="/img/banner/macbook.png" title="Macbook Pro" text={text} />
            </div>
          </div>
        </div>

        {/* ✅ MOBILE/TABLET (<lg) — carousel 1 card + dots */}
        <div className="d-sm-none">
          <div
            id="bannerCarousel"
            className={`carousel slide ${styles.carousel}`}
            data-bs-ride="carousel"
            data-bs-touch="true"
            data-bs-interval="false"
          >
            {/* dots */}
            <div className={`carousel-indicators ${styles.indicators}`}>
              <button
                type="button"
                data-bs-target="#bannerCarousel"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              />
              <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="1" aria-label="Slide 2" />
              <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="2" aria-label="Slide 3" />
              <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="3" aria-label="Slide 4" />
            </div>

            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className={styles.slidePad}>
                  <BannerCard variant="gray" img="/img/banner/popular.png" title="Popular Products" text={text} />
                </div>
              </div>

              <div className="carousel-item">
                <div className={styles.slidePad}>
                  <BannerCard variant="white" img="/img/banner/ipad.png" title="Ipad Pro" text={text} />
                </div>
              </div>

              <div className="carousel-item">
                <div className={styles.slidePad}>
                  <BannerCard variant="gray" img="/img/banner/sumsung.png" title="Samsung Galaxy" text={text} />
                </div>
              </div>

              <div className="carousel-item">
                <div className={styles.slidePad}>
                  <BannerCard variant="dark" img="/img/banner/macbook.png" title="Macbook Pro" text={text} />
                </div>
              </div>
            </div>

            {/* стрелки скрываем в CSS, но можно свайпать */}
            <button className="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
