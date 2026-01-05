"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    // Враховуємо, що бекенд чекає: username, email, password
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Registration failed");
            }

            // Успіх -> перенаправляємо на логін
            router.push("/auth/login");
        } catch (err: any) {
            setError(err.message || "Something went wrong. Try a different email.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div style={{ maxWidth: "450px", width: "100%", padding: "20px" }}>
                <h1 className="mb-2 fw-bold" style={{ fontSize: "2rem" }}>Create Account</h1>
                <p className="text-muted mb-4">Please fill in the details below:</p>

                {error && <div className="alert alert-danger py-2" style={{ fontSize: "0.9rem" }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    {/* FIRST NAME (USERNAME) */}
                    <div className="mb-3">
                        <label className="form-label fw-medium" style={{ fontSize: "0.9rem" }}>Full Name</label>
                        <input
                            type="text"
                            className="form-control p-3"
                            placeholder="Full Name"
                            value={form.username}
                            onChange={(e) => setForm({...form, username: e.target.value})}
                            required
                            style={{
                                borderRadius: "8px",
                                background: "#fff",
                                border: "1px solid #dee2e6"
                            }}
                        />
                    </div>

                    {/* EMAIL */}
                    <div className="mb-3">
                        <label className="form-label fw-medium" style={{ fontSize: "0.9rem" }}>Email</label>
                        <input
                            type="email"
                            className="form-control p-3"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({...form, email: e.target.value})}
                            required
                            style={{
                                borderRadius: "8px",
                                background: "#fff",
                                border: "1px solid #dee2e6"
                            }}
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="mb-4">
                        <label className="form-label fw-medium" style={{ fontSize: "0.9rem" }}>Password</label>
                        <input
                            type="password"
                            className="form-control p-3"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({...form, password: e.target.value})}
                            required
                            minLength={6}
                            style={{
                                borderRadius: "8px",
                                background: "#fff",
                                border: "1px solid #dee2e6"
                            }}
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="btn btn-dark w-100 py-3 fw-bold"
                        disabled={isLoading}
                        style={{ borderRadius: "8px", fontSize: "1rem", letterSpacing: "0.5px" }}
                    >
                        {isLoading ? "Creating..." : "CREATE ACCOUNT"}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-muted" style={{ fontSize: "0.95rem" }}>
                        Already have an account?{"  "}
                        <Link href="/auth/login" className="text-dark fw-bold text-decoration-none">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}