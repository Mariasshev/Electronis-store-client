"use client";
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/Header.module.css";

export default function Header() {
    return (
        <>
            {/* TOP BAR */}
            <header className="border-bottom bg-white">
                <div className="container-lg py-3 d-flex align-items-center justify-content-between">

                    {/* Logo */}
                    <div className="d-flex align-items-center">
                        {/*<img src="/logo.png" alt="logo" height="28" />*/}
                        <span className="fw-bold fs-4 ms-2">Cyber</span>
                    </div>

                    {/* Search */}
                    <div className="flex-grow-1 px-3 d-none d-md-block">
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

                    {/* Navigation */}
                    <nav className="d-none d-lg-flex gap-3">
                        <a href="#" className="nav-link text-dark">Home</a>
                        <a href="#" className="nav-link text-dark">About</a>
                        <a href="#" className="nav-link text-dark">Contact Us</a>
                        <a href="#" className="nav-link text-dark">Blog</a>
                    </nav>

                    {/* Icons */}
                    <div className="d-flex align-items-center gap-3">
                        <i className="bi bi-heart fs-5"></i>
                        <i className="bi bi-cart2 fs-5"></i>
                        <i className="bi bi-person fs-5"></i>

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
                <div className="collapse bg-white border-top" id="mobileMenu">
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
            </header>

            {/* SUBMENU – for desktop only */}
            <div className="bg-dark text-white d-none d-md-block">
                <div className="container d-flex justify-content-between py-3">

                    <a href="#" className="text-white text-decoration-none d-flex align-items-center gap-2">
                        <i className="bi bi-phone"></i> Phones
                    </a>

                    <span className="text-secondary">|</span>

                    <a href="#" className="text-white text-decoration-none d-flex align-items-center gap-2">
                        <i className="bi bi-laptop"></i> Computers
                    </a>

                    <span className="text-secondary">|</span>

                    <a href="#" className="text-white text-decoration-none d-flex align-items-center gap-2">
                        <i className="bi bi-smartwatch"></i> Smart Watches
                    </a>

                    <span className="text-secondary">|</span>

                    <a href="#" className="text-white text-decoration-none d-flex align-items-center gap-2">
                        <i className="bi bi-camera"></i> Cameras
                    </a>

                    <span className="text-secondary">|</span>

                    <a href="#" className="text-white text-decoration-none d-flex align-items-center gap-2">
                        <i className="bi bi-headphones"></i> Headphones
                    </a>

                    <span className="text-secondary">|</span>

                    <a href="#" className="text-white text-decoration-none d-flex align-items-center gap-2">
                        <i className="bi bi-controller"></i> Gaming
                    </a>
                </div>
            </div>
        </>
    );
}
