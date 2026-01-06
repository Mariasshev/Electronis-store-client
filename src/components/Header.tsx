"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/logo.svg"; // Перевір шлях до лого
import Submenu from "./Submenu";
import { useAuth } from "@/context/AuthContext"; // Перевір шлях до контексту
import SearchBar from "@/components/SearchBar";

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <>
            {/* TOP BAR */}
            <header className="border-bottom bg-white sticky-top" style={{ zIndex: 1020 }}>
                <div className="container-lg py-3">
                    <div className="row align-items-center">

                        {/* Logo */}
                        <div className="col-auto d-flex align-items-center">
                            <Link href="/">
                                <Image src={logo} alt="logo" height="28" />
                            </Link>
                        </div>

                        {/* Search */}
                        <SearchBar />

                        {/* Navigation Links */}
                        <div className="col-auto d-none d-xl-flex gap-3">
                            <Link href="/" className="nav-link text-dark">Home</Link>
                            <Link href="/catalog" className="nav-link text-dark">Catalog</Link>
                            <Link href="/contacts" className="nav-link text-dark">Contacts</Link>
                        </div>

                        {/* Icons + Auth Section */}
                        <div className="col-auto d-flex align-items-center gap-3 justify-content-end">

                            <Link href="/wishlist" className="text-decoration-none text-dark position-relative">
                                <i className="bi bi-heart fs-5 text-primary"></i>
                            </Link>

                            <Link href="/cart" className="text-decoration-none text-dark position-relative">
                                <i className="bi bi-cart2 fs-5 text-primary"></i>
                            </Link>

                            <div className="vr d-none d-sm-block mx-1"></div>

                            {/* --- АВТОРИЗАЦІЯ --- */}
                            {user ? (
                                // ЯКЩО УВІЙШОВ
                                <div className="d-flex align-items-center gap-2">
                                    {/* Ведемо на /account, як у твоїй папці */}
                                    <Link href="/account" className="text-decoration-none text-dark fw-bold d-none d-sm-block">
                                        {user.username}
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="btn btn-link text-danger p-0 text-decoration-none"
                                        title="Logout"
                                    >
                                        <i className="bi bi-box-arrow-right fs-5"></i>
                                    </button>
                                </div>
                            ) : (
                                // ЯКЩО ГІСТЬ (ВИПРАВЛЕНІ ШЛЯХИ)
                                <div className="d-flex gap-2">
                                    <Link href="/auth/login" className="btn btn-outline-dark btn-sm rounded-pill d-none d-sm-block">
                                        Log In
                                    </Link>
                                    <Link href="/auth/register" className="btn btn-dark btn-sm rounded-pill d-none d-sm-block">
                                        Sign Up
                                    </Link>
                                    {/* Мобільна іконка */}
                                    <Link href="/auth/login" className="d-sm-none text-primary">
                                        <i className="bi bi-person fs-5"></i>
                                    </Link>
                                </div>
                            )}

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
                            <Link href="/" className="nav-link text-dark">Home</Link>
                            <Link href="/catalog" className="nav-link text-dark">Catalog</Link>

                            <hr className="my-2"/>

                            {user ? (
                                <>
                                    <div className="fw-bold px-3">Hi, {user.username}</div>
                                    <Link href="/account" className="nav-link text-dark">My Profile</Link>
                                    <button onClick={logout} className="nav-link text-danger text-start bg-transparent border-0">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/auth/login" className="nav-link text-primary fw-bold">Log In</Link>
                                    <Link href="/auth/register" className="nav-link text-dark">Sign Up</Link>
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            </header>

            <Submenu />
        </>
    );
}