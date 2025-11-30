"use client";
import { useEffect } from "react";

export default function BootstrapProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // @ts-expect-error: no types for bootstrap JS
        import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    return <>{children}</>;
}
