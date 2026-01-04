"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Проверяем, есть ли юзер в памяти браузера
        const stored = localStorage.getItem("elstore_user");
        if (stored) setUser(JSON.parse(stored));
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("elstore_user", JSON.stringify(userData));
        router.push("/"); // После входа - на главную
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("elstore_user");
        router.push("/auth/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};