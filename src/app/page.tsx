"use client";

import BootstrapProvider from "../components/BootstrapProvider";
import BrowseCategories from "../components/BrowseCategories";

export default function Home() {
    return (
        <BootstrapProvider>

            <main>
                <BrowseCategories />
            </main>


        </BootstrapProvider>
    );
}
