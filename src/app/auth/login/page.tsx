"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext"; // Перевір, чи шлях правильний
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    // const router = useRouter(); // login() з контексту вже робить редірект, але про всяк випадок

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            // Звертаємося до твого Java сервлета
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Login failed");
            }

            const userData = await res.json();
            login(userData); // Ця функція оновить стейт і перекине на головну/профіль
        } catch (err: any) {
            setError(err.message || "Incorrect email or password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div style={{ maxWidth: "450px", width: "100%", padding: "20px" }}>
                <h1 className="mb-2 fw-bold" style={{ fontSize: "2rem" }}>Login</h1>
                <p className="text-muted mb-4">Please enter your e-mail and password:</p>

                {error && <div className="alert alert-danger py-2" style={{ fontSize: "0.9rem" }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    {/* EMAIL */}
                    <div className="mb-3">
                        <label className="form-label fw-medium" style={{ fontSize: "0.9rem" }}>Email</label>
                        <input
                            type="email"
                            className="form-control p-3"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                borderRadius: "8px",
                                background: "#fff",
                                border: "1px solid #dee2e6",
                                fontSize: "1rem"
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                borderRadius: "8px",
                                background: "#fff",
                                border: "1px solid #dee2e6",
                                fontSize: "1rem"
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
                        {isLoading ? "Logging in..." : "LOG IN"}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-muted" style={{ fontSize: "0.95rem" }}>
                        {"Don't have an account?"}
                        <Link href="/auth/register" className="text-dark fw-bold text-decoration-none">Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}