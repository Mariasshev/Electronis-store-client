"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/logo.svg";

import styles from "../styles/Header.module.css";

export default function Header() {
    return (
        <>
            {/* TOP BAR */} <header className="border-bottom bg-white"> <div className="container-lg py-3"> <div className="row align-items-center">

            {/* Logo */}
            <div className="col-auto d-flex align-items-center">
                <Image src={logo} alt="logo" height="28" />
            </div>

            {/* Search */}
            <div className="col d-none d-md-block px-3">
                <div className="input-group">
                            <span className="input-group-text bg-white border-end-0">
                                <i className="bi bi-search"></i>
                            </span>
                    <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Search"
                    />
                </div>
            </div>

            <div className="col-auto d-none d-lg-flex gap-3">
                {/* Ссылка на главную */}
                <Link href="/" className="nav-link text-dark">
                    Home
                </Link>

                {/* Ссылка на каталог */}
                <Link href="/catalog" className="nav-link text-dark">
                    Catalog
                </Link>

                {/* Остальные ссылки (пока можно оставить # или указать будущие пути) */}
                <Link href="/contacts" className="nav-link text-dark">
                    Contact Us
                </Link>
                <Link href="/blog" className="nav-link text-dark">
                    Blog
                </Link>
            </div>

            {/* Icons + Mobile Burger */}
            <div className="col-auto d-flex align-items-center gap-3 justify-content-end">
                <i className="bi bi-heart fs-5 text-primary"></i>
                <i className="bi bi-cart2 fs-5 text-primary"></i>
                <i className="bi bi-person fs-5 text-primary"></i>

                {/* Mobile Burger */}
                <button
                    className="btn btn-light d-lg-none"
                    data-bs-toggle="collapse"
                    data-bs-target="#mobileMenu"
                >
                    <i className="bi bi-list fs-4"></i>
                </button>
            </div>
        </div>

            {/* Mobile Menu */}
            <div className="collapse bg-white border-top mt-2" id="mobileMenu">
                <nav className="p-3 d-flex flex-column gap-2">
                    <a href="#" className="nav-link text-dark">Home</a>
                    <a href="#" className="nav-link text-dark">About</a>
                    <a href="#" className="nav-link text-dark">Contact Us</a>
                    <a href="#" className="nav-link text-dark">Blog</a>

                    {/* Mobile Search */}
                    <div className="input-group mt-3">
                            <span className="input-group-text bg-white border-end-0">
                                <i className="bi bi-search"></i>
                            </span>
                        <input
                            type="text"
                            className="form-control border-start-0"
                            placeholder="Search"
                        />
                    </div>
                </nav>
            </div>
        </div>
        </header>

            {/* SUBMENU – for desktop only */}
            <div className="bg-dark text-white d-none d-md-block">
                <div className="container-lg">
                    <div className="row py-3 d-flex justify-content-between">
                        <div className="col-auto d-flex align-items-center gap-2">
                            <i className="bi bi-phone"></i> <a href="#" className="text-white text-decoration-none">Phones</a>
                        </div>
                        <div className="col-auto text-secondary">|</div>
                        <div className="col-auto d-flex align-items-center gap-2">
                            <i className="bi bi-laptop"></i> <a href="#" className="text-white text-decoration-none">Computers</a>
                        </div>
                        <div className="col-auto text-secondary">|</div>
                        <div className="col-auto d-flex align-items-center gap-2">
                            <i className="bi bi-smartwatch"></i> <a href="#" className="text-white text-decoration-none">Smart Watches</a>
                        </div>
                        <div className="col-auto text-secondary">|</div>
                        <div className="col-auto d-flex align-items-center gap-2">
                            <i className="bi bi-camera"></i> <a href="#" className="text-white text-decoration-none">Cameras</a>
                        </div>
                        <div className="col-auto text-secondary">|</div>
                        <div className="col-auto d-flex align-items-center gap-2">
                            <i className="bi bi-headphones"></i> <a href="#" className="text-white text-decoration-none">Headphones</a>
                        </div>
                        <div className="col-auto text-secondary">|</div>
                        <div className="col-auto d-flex align-items-center gap-2">
                            <i className="bi bi-controller"></i> <a href="#" className="text-white text-decoration-none">Gaming</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}
