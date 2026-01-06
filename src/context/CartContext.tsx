"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

interface CartContextType {
    cartItems: number[]; // ID товарів у корзині
    addToCart: (productId: number) => Promise<void>;
    removeFromCart: (productId: number) => Promise<void>;
    isInCart: (productId: number) => boolean;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState<number[]>([]);
    const clearCart = () => {
        setCartItems([]); // Очищаємо локальний стейт (бейдж зникне)
    };

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:8080/api/cart?userId=${user.id}`)
                .then(res => res.json())
                .then((data: any[]) => {
                    // API повертає об'єкти CartItem, де є поле product { id: ... }
                    const ids = data.map(item => item.product.id);
                    setCartItems(ids);
                })
                .catch(err => console.error(err));
        } else {
            setCartItems([]);
        }
    }, [user]);

    const addToCart = async (productId: number) => {
        if (!user) {
            toast.error("Please log in first");
            return;
        }

        setCartItems(prev => [...prev, productId]); // Оптимістично

        try {
            const res = await fetch("http://localhost:8080/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.id, productId, quantity: 1 }),
            });
            if (!res.ok) throw new Error();
            toast.success("Added to Cart");
        } catch (error) {
            setCartItems(prev => prev.filter(id => id !== productId));
            toast.error("Failed to add to cart");
        }
    };

    const removeFromCart = async (productId: number) => {
        if (!user) return;
        setCartItems(prev => prev.filter(id => id !== productId));

        try {
            await fetch(`http://localhost:8080/api/cart?userId=${user.id}&productId=${productId}`, {
                method: "DELETE",
            });
            toast.success("Removed from Cart");
        } catch (error) {
            setCartItems(prev => [...prev, productId]);
        }
    };

    const isInCart = (productId: number) => cartItems.includes(productId);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isInCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};