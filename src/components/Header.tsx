"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/logo.svg";
// Імпортуємо новий компонент (перевір шлях!)
import Submenu from "./Submenu";

import styles from "../styles/Header.module.css";

export default function Header() {
    return (
        <>
            {/* TOP BAR */}
            <header className="border-bottom bg-white">
                <div className="container-lg py-3">
                    <div className="row align-items-center">

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

                        {/* Navigation Links */}
                        <div className="col-auto d-none d-lg-flex gap-3">
                            <Link href="/" className="nav-link text-dark">
                                Home
                            </Link>
                            <Link href="/catalog" className="nav-link text-dark">
                                Catalog
                            </Link>
                            <Link href="/contacts" className="nav-link text-dark">
                                Contact Us
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

                    {/* Mobile Menu Dropdown */}
                    <div className="collapse bg-white border-top mt-2" id="mobileMenu">
                        <nav className="p-3 d-flex flex-column gap-2">
                            <Link href="/" className="nav-link text-dark">Home</Link>
                            <Link href="/catalog" className="nav-link text-dark">Catalog</Link>
                            <Link href="/contacts" className="nav-link text-dark">Contact Us</Link>

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

            {/* Вставляємо Submenu сюди */}
            <Submenu />
        </>
    );
}