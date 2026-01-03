import React from 'react';
import Link from 'next/link';
import { IoChevronForward } from "react-icons/io5";

export interface BreadcrumbItem {
    label: string;
    href?: string; // Ссылка необязательна (например, для последнего элемента)
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    return (
        <nav aria-label="breadcrumb" className="mb-4 text-muted small">
            <div className="d-flex align-items-center gap-2">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <React.Fragment key={index}>
                            {/* Если это не первый элемент, рисуем разделитель перед ним */}
                            {index > 0 && <IoChevronForward className="text-secondary" />}

                            {isLast ? (
                                // Последний элемент — просто текст (активная страница)
                                <span className="text-dark fw-medium">
                  {item.label}
                </span>
                            ) : (
                                // Остальные элементы — ссылки
                                <Link
                                    href={item.href || '#'}
                                    className="text-decoration-none text-muted hover-text-dark"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </nav>
    );
};

export default Breadcrumbs;