"use client";

import Link from "next/link";
import React from "react";

const menuItems = [
    { id: 1, label: "Phones", icon: "bi-phone" },
    { id: 2, label: "Computers", icon: "bi-laptop" },
    { id: 3, label: "Smart Watches", icon: "bi-smartwatch" },
    { id: 4, label: "Cameras", icon: "bi-camera" },
    { id: 5, label: "Headphones", icon: "bi-headphones" },
    { id: 6, label: "Gaming", icon: "bi-controller" },
];

export default function Submenu() {
    return (
        <div className="bg-dark text-white d-none d-md-block">
        <div className="container-lg">
        <div className="row py-3 d-flex justify-content-between">

            {menuItems.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <div className="col-auto d-flex align-items-center gap-2">
                <i className={`bi ${item.icon}`}></i>
            <Link
    href={`/catalog?categoryId=${item.id}`}
    className="text-white text-decoration-none"
        >
        {item.label}
        </Link>
        </div>
    {index < menuItems.length - 1 && (
        <div className="col-auto text-secondary">|</div>
    )}
    </React.Fragment>
))}

    </div>
    </div>
    </div>
);
}