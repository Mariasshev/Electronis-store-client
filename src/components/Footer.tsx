"use client";
import { FaTwitter, FaFacebookF, FaTiktok, FaInstagram } from "react-icons/fa";

import styles from "../styles/Footer.module.css";

export default function Footer() {
    return ( <footer className={styles.footer}> <div className="container py-5"> <div className="row">

            {/* Logo + Description + Socials */}
            <div className="col-12 col-md-4 mb-4 mb-md-0">
                <div className="d-flex align-items-center mb-2">
                    <span className="fw-bold fs-5 text-white">cyber</span>
                </div>
                <p className="text-secondary small">
                    We are a residential interior design firm located in Portland. Our boutique-studio offers more than
                </p>
                <div className="d-flex gap-3 mt-3">
                    <a href="#" className={styles.social}><FaTwitter /></a>
                    <a href="#" className={styles.social}><FaFacebookF /></a>
                    <a href="#" className={styles.social}><FaTiktok /></a>
                    <a href="#" className={styles.social}><FaInstagram /></a>
                </div>
            </div>

            {/* Services */}
            <div className="col-6 col-md-4 mb-4 mb-md-0">
                <h6 className="text-white mb-3">Services</h6>
                <ul className="list-unstyled text-secondary small">
                    <li><a href="#" className={styles.link}>Bonus program</a></li>
                    <li><a href="#" className={styles.link}>Gift cards</a></li>
                    <li><a href="#" className={styles.link}>Credit and payment</a></li>
                    <li><a href="#" className={styles.link}>Service contracts</a></li>
                    <li><a href="#" className={styles.link}>Non-cash account</a></li>
                    <li><a href="#" className={styles.link}>Payment</a></li>
                </ul>
            </div>

            {/* Assistance to the buyer */}
            <div className="col-6 col-md-4">
                <h6 className="text-white mb-3">Assistance to the buyer</h6>
                <ul className="list-unstyled text-secondary small">
                    <li><a href="#" className={styles.link}>Find an order</a></li>
                    <li><a href="#" className={styles.link}>Terms of delivery</a></li>
                    <li><a href="#" className={styles.link}>Exchange and return of goods</a></li>
                    <li><a href="#" className={styles.link}>Guarantee</a></li>
                    <li><a href="#" className={styles.link}>Frequently asked questions</a></li>
                    <li><a href="#" className={styles.link}>Terms of use of the site</a></li>
                </ul>
            </div>

        </div>
        </div>
        </footer>
    );

}
