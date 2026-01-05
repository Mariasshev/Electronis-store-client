"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

interface WishlistContextType {
    wishlistIds: number[]; // Список ID товарів, які ми лайкнули
    addToWishlist: (productId: number) => Promise<void>;
    removeFromWishlist: (productId: number) => Promise<void>;
    isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [wishlistIds, setWishlistIds] = useState<number[]>([]);

    // 1. При вході на сайт - завантажуємо список ID улюблених товарів
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:8080/api/wishlist?userId=${user.id}`)
                .then(res => res.json())
                .then((data: any[]) => {
                    // Бекенд повертає об'єкти товарів, нам треба тільки їх ID
                    const ids = data.map(item => item.id);
                    setWishlistIds(ids);
                })
                .catch(err => console.error("Failed to load wishlist", err));
        } else {
            setWishlistIds([]);
        }
    }, [user]);

    // 2. Функція додавання
    const addToWishlist = async (productId: number) => {
        if (!user) {
            toast.error("Please log in first");
            return;
        }

        // Оптимістичне оновлення (спочатку малюємо, потім шлемо запит)
        setWishlistIds(prev => [...prev, productId]);

        try {
            const res = await fetch("http://localhost:8080/api/wishlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.id, productId }),
            });
            if (!res.ok) throw new Error();
            toast.success("Added to Wishlist");
        } catch (error) {
            // Якщо помилка - відкочуємо зміни
            setWishlistIds(prev => prev.filter(id => id !== productId));
            toast.error("Failed to add");
        }
    };

    // 3. Функція видалення
    const removeFromWishlist = async (productId: number) => {
        if (!user) return;

        setWishlistIds(prev => prev.filter(id => id !== productId));

        try {
            await fetch(`http://localhost:8080/api/wishlist?userId=${user.id}&productId=${productId}`, {
                method: "DELETE",
            });
            toast("Removed from Wishlist", { icon: '💔' });
        } catch (error) {
            setWishlistIds(prev => [...prev, productId]); // Відкочуємо
            toast.error("Failed to remove");
        }
    };

    // 4. Перевірка: чи лайкнутий цей товар?
    const isInWishlist = (productId: number) => {
        return wishlistIds.includes(productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlistIds, addToWishlist, removeFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
    return context;
};