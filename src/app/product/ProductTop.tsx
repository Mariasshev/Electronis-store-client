"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  FiCpu,
  FiCamera,
  FiSmartphone,
  FiBatteryCharging,
  FiAperture,
  FiGrid,
  FiTruck,
  FiHome,
  FiShield,
} from "react-icons/fi";

import styles from "../../styles/ProductTop.module.css";

type ColorKey = "black" | "purple" | "red" | "yellow" | "gray";
type MemoryKey = "128" | "256" | "512" | "1tb";

type GalleryItem = {
  id: number;
  thumb: string;
  alt: string;
  // разные main под цвет
  mainByColor: Record<ColorKey, string>;
};

export default function ProductTop() {
  const gallery: GalleryItem[] = useMemo(
    () => [
      {
        id: 1,
        thumb: "/img/product/thumb-1.png",
        alt: "iPhone image 1",
        mainByColor: {
          black: "/img/product/main.png",
          purple: "/img/product/thumb-1.png",
          red: "/img/product/thumb-2.png",
          yellow: "/img/product/thumb-3.png",
          gray: "/img/product/thumb-4.png",
        },
      },
      {
        id: 2,
        thumb: "/img/product/thumb-2.png",
        alt: "iPhone image 2",
        mainByColor: {
          black: "/img/product/thumb-2.png",
          purple: "/img/product/main.png",
          red: "/img/product/main.png",
          yellow: "/img/product/main.png",
          gray: "/img/product/main.png",
        },
      },
      {
        id: 3,
        thumb: "/img/product/thumb-3.png",
        alt: "iPhone image 3",
        mainByColor: {
          black: "/img/product/thumb-3.png",
          purple: "/img/product/main.png",
          red: "/img/product/main.png",
          yellow: "/img/product/main.png",
          gray: "/img/product/main.png",
        },
      },
      {
        id: 4,
        thumb: "/img/product/thumb-4.png",
        alt: "iPhone image 4",
        mainByColor: {
          black: "/img/product/thumb-4.png",
          purple: "/img/product/main.png",
          red: "/img/product/main.png",
          yellow: "/img/product/main.png",
          gray: "/img/product/main.png",
        },
      },
    ],
    []
  );

  const [activeImg, setActiveImg] = useState(1);
  const [color, setColor] = useState<ColorKey>("black");
  const [memory, setMemory] = useState<MemoryKey>("1tb");
  const [wish, setWish] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const current = gallery.find((g) => g.id === activeImg) ?? gallery[0];
  const mainSrc = current.mainByColor[color] ?? "/img/product/main.png";

  const baseText =
    "Enhanced capabilities thanks toan enlarged display of 6.7 inchesand work without rechargingthroughout the day. Incredible photosas in weak, yesand in bright lightusing the new systemwith two cameras";
  const moreText =
    " The ProMotion display makes scrolling feel incredibly smooth, the A16 Bionic keeps everything fast, and the camera system handles both low light and bright scenes confidently.";

  return (
    <section className={styles.section}>
      <div className="row g-4 align-items-start">
        {/* LEFT */}
        <div className="col-12 col-lg-6">
          <div className={styles.gallery}>
            <div className={styles.thumbs}>
              {gallery.map((g) => (
                <button
                  key={g.id}
                  className={`${styles.thumb} ${g.id === activeImg ? styles.thumbActive : ""}`}
                  type="button"
                  onClick={() => setActiveImg(g.id)}
                  aria-pressed={g.id === activeImg}
                >
                  <Image src={g.thumb} alt={g.alt} width={56} height={72} />
                </button>
              ))}
            </div>

            <div className={styles.mainImage}>
              <Image
                src={mainSrc}
                alt={current.alt}
                fill
                className={styles.mainImg}
                sizes="(max-width: 991px) 92vw, 520px"
                priority
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-12 col-lg-6">
          <div className={styles.info}>
            <h1 className={styles.title}>Apple iPhone 14 Pro Max</h1>

            <div className={styles.priceRow}>
              <div className={styles.price}>$1399</div>
              <div className={styles.oldPrice}>$1499</div>
            </div>

            {/* colors */}
            <div className={styles.colorsRow}>
              <div className={styles.label}>Select color :</div>

              <div className={styles.colors} role="radiogroup" aria-label="Select color">
                <ColorDot label="Black" active={color === "black"} className={styles.dotBlack} onClick={() => setColor("black")} />
                <ColorDot label="Purple" active={color === "purple"} className={styles.dotPurple} onClick={() => setColor("purple")} />
                <ColorDot label="Red" active={color === "red"} className={styles.dotRed} onClick={() => setColor("red")} />
                <ColorDot label="Yellow" active={color === "yellow"} className={styles.dotYellow} onClick={() => setColor("yellow")} />
                <ColorDot label="Gray" active={color === "gray"} className={styles.dotGray} onClick={() => setColor("gray")} />
              </div>
            </div>

            {/* memory */}
            <div className={styles.memory} role="radiogroup" aria-label="Select storage">
              <button className={styles.memBtn} type="button" disabled>
                128GB
              </button>

              <button
                className={`${styles.memBtn} ${memory === "256" ? styles.memActive : ""}`}
                type="button"
                onClick={() => setMemory("256")}
                aria-pressed={memory === "256"}
              >
                256GB
              </button>

              <button
                className={`${styles.memBtn} ${memory === "512" ? styles.memActive : ""}`}
                type="button"
                onClick={() => setMemory("512")}
                aria-pressed={memory === "512"}
              >
                512GB
              </button>

              <button
                className={`${styles.memBtn} ${memory === "1tb" ? styles.memActive : ""}`}
                type="button"
                onClick={() => setMemory("1tb")}
                aria-pressed={memory === "1tb"}
              >
                1TB
              </button>
            </div>

            {/* specs */}
            <div className={styles.specs}>
              <Spec icon={<FiSmartphone />} label="Screen size" value='6.7"' />
              <Spec icon={<FiCpu />} label="CPU" value="Apple A16 Bionic" />
              <Spec icon={<FiGrid />} label="Number of Cores" value="6" />
              <Spec icon={<FiCamera />} label="Main camera" value="48-12-12 MP" />
              <Spec icon={<FiAperture />} label="Front-camera" value="12 MP" />
              <Spec icon={<FiBatteryCharging />} label="Battery capacity" value="4323 mAh" />
            </div>

            {/* description */}
            <p className={styles.desc}>
              {baseText}
              {showMore ? moreText : " "}
              <button className={styles.moreBtnLink} type="button" onClick={() => setShowMore((v) => !v)}>
                {showMore ? "less..." : "more..."}
              </button>
            </p>

            {/* actions */}
            <div className={styles.actions}>
              <button
                className={`${styles.wishBtn} ${wish ? styles.wishActive : ""}`}
                type="button"
                onClick={() => setWish((v) => !v)}
              >
                {wish ? "In Wishlist" : "Add to Wishlist"}
              </button>

              <button
                className={`${styles.cartBtn} ${inCart ? styles.cartActive : ""}`}
                type="button"
                onClick={() => setInCart((v) => !v)}
              >
                {inCart ? "Added" : "Add to Card"}
              </button>
            </div>

            {/* benefits */}
            <div className={styles.benefits}>
              <Benefit icon={<FiTruck />} top="Free Delivery" bottom="1-2 day" />
              <Benefit icon={<FiHome />} top="In Stock" bottom="Today" />
              <Benefit icon={<FiShield />} top="Guaranteed" bottom="1 year" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ColorDot({
  label,
  active,
  className,
  onClick,
}: {
  label: string;
  active: boolean;
  className: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`${styles.colorDot} ${className} ${active ? styles.dotActive : ""}`}
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
    />
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className={styles.spec}>
      <div className={styles.specIcon} aria-hidden="true">
        {icon}
      </div>
      <div>
        <div className={styles.specKey}>{label}</div>
        <div className={styles.specVal}>{value}</div>
      </div>
    </div>
  );
}

function Benefit({ icon, top, bottom }: { icon: React.ReactNode; top: string; bottom: string }) {
  return (
    <div className={styles.benefit}>
      <div className={styles.benefitIcon} aria-hidden="true">
        {icon}
      </div>
      <div>
        <div className={styles.benefitTop}>{top}</div>
        <div className={styles.benefitBottom}>{bottom}</div>
      </div>
    </div>
  );
}
