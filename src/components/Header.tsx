"use client";
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/Header.module.css";

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container">
                {/* Логотип */}
                <Link href="/" className="navbar-brand d-flex align-items-center">
                    {/*<Image src="/logo.png" alt="Logo" width={40} height={40} />*/}
                    <span className="ms-2 fw-bold">Cyber</span>
                </Link>

                {/* Кнопка для мобильного меню */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Навигация */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/catalog">Catalog</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/blog">Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/contact">Contact Us</Link>
                        </li>
                    </ul>

                    {/* Иконки справа */}
                    <div className="d-flex align-items-center">
                        <Link href="/favorites" className="me-3">
                            <i className="bi bi-heart fs-5 text-primary"></i>
                        </Link>
                        <Link href="/cart" className="me-3">
                            <i className="bi bi-cart fs-5 text-primary"></i>
                        </Link>
                        <Link href="/profile">
                            <i className="bi bi-person fs-5 text-primary"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
