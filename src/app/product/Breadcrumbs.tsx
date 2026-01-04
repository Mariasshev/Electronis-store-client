"use client";

import Link from "next/link";
import styles from "../../styles/Breadcrumbs.module.css";

// Описуємо структуру одного елемента хлібних крихт
export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="breadcrumb" className={styles.wrap}>
            <ol className="breadcrumb mb-0">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li
                            key={index}
                            className={`breadcrumb-item ${isLast ? `active ${styles.active}` : ""}`}
                            aria-current={isLast ? "page" : undefined}
                        >
                            {isLast ? (
                                item.label
                            ) : (
                                <Link href={item.href || "#"} className={styles.link}>
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}