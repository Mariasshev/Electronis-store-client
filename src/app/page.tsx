"use client";

import BootstrapProvider from "../components/BootstrapProvider";
import Hero from "../components/Hero";
import BrowseCategories from "../components/BrowseCategories";

export default function Home() {
    return (
        <BootstrapProvider>

            <main>
                <Hero />
                <BrowseCategories />
            </main>


        </BootstrapProvider>
    );
}
