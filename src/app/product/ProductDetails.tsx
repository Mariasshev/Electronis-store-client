"use client";

import { useMemo, useState } from "react";
import styles from "../../styles/ProductDetails.module.css";

type Row = { label: string; value: string | string[] };

export default function ProductDetails() {
  const [expanded, setExpanded] = useState(false);

  const rowsScreen: Row[] = useMemo(
    () => [
      { label: "Screen diagonal", value: '6.7"' },
      { label: "The screen resolution", value: "2796×1290" },
      { label: "The screen refresh rate", value: "120 Hz" },
      { label: "The pixel density", value: "460 ppi" },
      { label: "Screen type", value: "OLED" },
      {
        label: "Additionally",
        value: ["Dynamic Island", "Always-On display", "HDR display", "True Tone", "Wide color (P3)"],
      },
    ],
    []
  );

  const rowsCpu: Row[] = useMemo(
    () => [
      { label: "CPU", value: "A16 Bionic" },
      { label: "Number of cores", value: "6" },
      // эти строки “в скрытой части”, чтобы View More имел смысл
      ...(expanded
        ? [
            { label: "GPU", value: "5-core GPU" },
            { label: "Neural Engine", value: "16-core" },
            { label: "Process", value: "4-nm" },
          ]
        : []),
    ],
    [expanded]
  );

  const toggle = () => setExpanded((v) => !v);

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h2 className={styles.title}>Details</h2>

        <p className={styles.lead}>
          Just as a book is judged by its cover, the first thing you notice when you pick up a modern
          smartphone is the display. Nothing surprising, because advanced technologies allow you to
          practically level the display frames and cutouts for the front camera and speaker, leaving
          no room for bold design solutions. And how good that in such realities Apple everything is
          fine with displays. Both critics and mass consumers always praise the quality of the picture
          provided by the products of the Californian brand. And last years 6.7-inch Retina panels,
          which had ProMotion, caused real admiration for many.
        </p>

        <div className={styles.block}>
          <h3 className={styles.subtitle}>Screen</h3>
          <div className={styles.table}>
            {rowsScreen.map((r) => (
              <RowLine key={r.label} row={r} />
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.block}>
          <h3 className={styles.subtitle}>CPU</h3>
          <div className={styles.table}>
            {rowsCpu.map((r) => (
              <RowLine key={r.label} row={r} />
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.moreBtn} type="button" onClick={toggle} aria-expanded={expanded}>
            <span>{expanded ? "Hide" : "View More"}</span>
            <span className={`${styles.chev} ${expanded ? styles.chevUp : ""}`} aria-hidden="true">
              ▾
            </span>
          </button>

          {/* “от себя”: маленькая подсказка/бейдж при раскрытии */}
          {expanded && <div className={styles.hint}>Extra specs are shown. Click “Hide” to collapse.</div>}
        </div>
      </div>
    </section>
  );
}

function RowLine({ row }: { row: { label: string; value: string | string[] } }) {
  const isList = Array.isArray(row.value);

  return (
    <div className={styles.row}>
      <div className={styles.left}>{row.label}</div>

      <div className={styles.right}>
        {isList ? (
          <div className={styles.list}>
            {row.value.map((x) => (
              <div key={x} className={styles.listItem}>
                {x}
              </div>
            ))}
          </div>
        ) : (
          <span>{row.value}</span>
        )}
      </div>
    </div>
  );
}
