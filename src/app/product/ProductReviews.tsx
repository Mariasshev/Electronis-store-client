"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import styles from "../../styles/ProductReviews.module.css";

type Review = {
  id: number;
  name: string;
  date: string;
  rating: number; // 1..5
  text: string;
  avatar: string;
  photos?: string[];
};

function Stars({ value }: { value: number }) {
  // простые звезды как в макете (оранжевые)
  const full = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className={styles.stars} aria-label={`${full} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`${styles.star} ${i < full ? styles.starOn : styles.starOff}`}>
          ★
        </span>
      ))}
    </div>
  );
}

function BarRow({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div className={styles.barRow}>
      <div className={styles.barLabel}>{label}</div>
      <div className={styles.barTrack} aria-hidden="true">
        <div className={styles.barFill} style={{ width: `${pct}%` }} />
      </div>
      <div className={styles.barNum}>{value}</div>
    </div>
  );
}

export default function ProductReviews() {
  const [expanded, setExpanded] = useState(false);

  const stats = useMemo(
    () => ({
      rating: 4.8,
      total: 125,
      counts: {
        Excellent: 100,
        Good: 11,
        Average: 3,
        "Below Average": 8,
        Poor: 1,
      },
    }),
    []
  );

  const baseReviews: Review[] = useMemo(
    () => [
      {
        id: 1,
        name: "Grace Carey",
        date: "24 January,2023",
        rating: 5,
        avatar: "/img/reviews/u1.png",
        text:
          "I was a bit nervous to be buying a secondhand phone from Amazon, but I couldn't be happier with my purchase! I have a pre-paid data plan so I was worried that this phone wouldn't connect with my data plan, since the new phones don't have the physical SIM anymore, but couldn't have been easier! I bought an Unlocked black iPhone 14 Pro Max in excellent condition and everything is PERFECT. It was super easy to set up and the phone works and looks great. It truly was in excellent condition. Highly recommend!!",
      },
      {
        id: 2,
        name: "Ronald Richards",
        date: "24 January,2023",
        rating: 4,
        avatar: "/img/reviews/u2.png",
        text:
          "This phone has 1T storage and is durable. Plus all the new iPhones have a C port! Apple is phasing out the current ones! All about the Benjamin! So if you want a phone that's going to last grab an iPhone 14 pro max and get several cords and plugs.",
      },
      {
        id: 3,
        name: "Darcy King",
        date: "24 January,2023",
        rating: 4,
        avatar: "/img/reviews/u3.png",
        text:
          "I might be the only one to say this but the camera is a little funky. Hoping it will change with a software update; otherwise, love this phone!! Came in great condition",
        photos: ["/img/reviews/p1.png", "/img/reviews/p2.png"],
      },
    ],
    []
  );

  const extraReviews: Review[] = useMemo(
    () => [
      {
        id: 4,
        name: "John Malcolm",
        date: "24 January,2023",
        rating: 5,
        avatar: "/img/reviews/u4.png",
        text:
          "Amazing phone, it is already difficult to surprise with the opening of a new iPhone, but it is still possible. Especially if it is a True Cost project. Hope you pay and instance and get value at cost price.",
      },
    ],
    []
  );

  const reviews = expanded ? [...baseReviews, ...extraReviews] : baseReviews;

  const maxBar = Math.max(...Object.values(stats.counts));

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h2 className={styles.title}>Reviews</h2>

        {/* top summary */}
        <div className="row g-3 g-lg-4 align-items-start">
          {/* rating card */}
          <div className="col-12 col-lg-4">
            <div className={styles.ratingCard}>
              <div className={styles.ratingNum}>{stats.rating.toFixed(1)}</div>
              <div className={styles.ratingMeta}>
                <div className={styles.totalText}>of {stats.total} reviews</div>
                <Stars value={stats.rating} />
              </div>
            </div>
          </div>

          {/* bars */}
          <div className="col-12 col-lg-8">
            <div className={styles.bars}>
              {Object.entries(stats.counts).map(([k, v]) => (
                <BarRow key={k} label={k} value={v} max={maxBar} />
              ))}
            </div>
          </div>
        </div>

        {/* leave comment */}
        <div className="mt-3">
          <input className={styles.input} type="text" placeholder="Leave Comment" />
        </div>

        {/* list */}
        <div className={styles.list}>
          {reviews.map((r) => (
            <article key={r.id} className={styles.item}>
              <div className={styles.avatar}>
                <Image src={r.avatar} alt={r.name} width={40} height={40} />
              </div>

              <div className={styles.body}>
                <div className={styles.headRow}>
                  <div className={styles.name}>{r.name}</div>
                  <div className={styles.date}>{r.date}</div>
                </div>

                <Stars value={r.rating} />

                <p className={styles.text}>{r.text}</p>

                {r.photos?.length ? (
                  <div className={styles.photos}>
                    {r.photos.map((p) => (
                      <div key={p} className={styles.photo}>
                        <Image src={p} alt="review photo" fill className={styles.photoImg} />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        {/* view more */}
        <div className={styles.actions}>
          <button className={styles.moreBtn} type="button" onClick={() => setExpanded((v) => !v)}>
            <span>{expanded ? "Hide" : "View More"}</span>
            <span className={`${styles.chev} ${expanded ? styles.chevUp : ""}`} aria-hidden="true">
              ▾
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
