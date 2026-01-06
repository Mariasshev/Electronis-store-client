"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

// --- ТИПИ ---
type SpecItem = { key: string; value: string };
type ColorItem = { name: string; hex: string; quantity: number };

// --- ШАБЛОНИ ХАРАКТЕРИСТИК ---
const CATEGORY_TEMPLATES: Record<string, string[]> = {
    "1": ["Screen size", "CPU", "RAM", "Storage", "Camera", "Battery"], // Phones
    "2": ["CPU", "GPU", "RAM", "SSD", "Screen size", "Weight"],         // Laptops
    "3": ["Case Material", "Strap Material", "Water Resistance", "Sensors"], // Watches
    "4": ["Type", "Connection", "Battery Life", "Noise Cancelling"],    // Headphones
    "5": ["Megapixels", "Video Resolution", "Lens Type", "ISO Range"]   // Cameras
};

export default function AddProductPage() {
    const { user } = useAuth();
    const router = useRouter();

    // --- STATE ---
    const [basicInfo, setBasicInfo] = useState({
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        categoryId: "1", // Default: Phones
        brandId: "1",    // Default: Apple (можна завантажувати з БД)
        imageUrl: "",    // Main image
    });

    const [gallery, setGallery] = useState<string[]>([""]); // Array of URLs
    const [colors, setColors] = useState<ColorItem[]>([{ name: "", hex: "#000000", quantity: 0 }]);

    // Характеристики (ключ-значення)
    const [specs, setSpecs] = useState<SpecItem[]>(
        CATEGORY_TEMPLATES["1"].map(key => ({ key, value: "" }))
    );

    // --- HANDLERS ---

    // Зміна категорії -> Оновлення полів характеристик
    const handleCategoryChange = (newCatId: string) => {
        setBasicInfo({ ...basicInfo, categoryId: newCatId });
        // Завантажуємо шаблон для нової категорії
        const template = CATEGORY_TEMPLATES[newCatId] || [];
        setSpecs(template.map(key => ({ key, value: "" })));
    };

    // Робота з характеристиками
    const handleSpecChange = (index: number, field: "key" | "value", val: string) => {
        const newSpecs = [...specs];
        newSpecs[index][field] = val;
        setSpecs(newSpecs);
    };
    const addSpecField = () => setSpecs([...specs, { key: "", value: "" }]);
    const removeSpecField = (index: number) => setSpecs(specs.filter((_, i) => i !== index));

    // Робота з кольорами
    const handleColorChange = (index: number, field: keyof ColorItem, val: string | number) => {
        const newColors = [...colors];
        newColors[index] = { ...newColors[index], [field]: val };
        setColors(newColors);
    };
    const addColorField = () => setColors([...colors, { name: "", hex: "#000000", quantity: 1 }]);
    const removeColorField = (index: number) => setColors(colors.filter((_, i) => i !== index));

    // Робота з галереєю
    const handleGalleryChange = (index: number, val: string) => {
        const newGallery = [...gallery];
        newGallery[index] = val;
        setGallery(newGallery);
    };
    const addGalleryField = () => setGallery([...gallery, ""]);
    const removeGalleryField = (index: number) => setGallery(gallery.filter((_, i) => i !== index));

    // --- SUBMIT ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || user.role !== "ADMIN") return;

        // Формуємо об'єкт для Java
        // Потрібно перетворити масив specs [{key, value}] в об'єкт {"Screen": "6.1", ...}
        const specsMap: Record<string, string> = {};
        specs.forEach(s => { if(s.key) specsMap[s.key] = s.value });

        // Фільтруємо пусті картинки
        const cleanGallery = gallery.filter(url => url.trim() !== "");

        const payload = {
            name: basicInfo.name,
            description: basicInfo.description,
            price: parseFloat(basicInfo.price),
            stockQuantity: parseInt(basicInfo.stockQuantity),
            categoryId: parseInt(basicInfo.categoryId),
            brandId: parseInt(basicInfo.brandId),
            imageUrl: basicInfo.imageUrl,
            colors: colors,
            gallery: cleanGallery,
            specifications: specsMap
        };

        try {
            const res = await fetch("http://localhost:8080/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                toast.success("Product created!");
                router.push("/catalog"); // Повернутися в каталог
            } else {
                toast.error("Error creating product");
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error");
        }
    };

    if (!user || user.role !== "ADMIN") {
        return <div className="p-5 text-center">Access Denied. Admins only.</div>;
    }

    return (
        <div className="container py-5" style={{ maxWidth: "800px" }}>
            <h2 className="mb-4 fw-bold">Add New Product</h2>

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">

                {/* 1. КАТЕГОРІЯ І БРЕНД */}
                <div className="card p-4 shadow-sm border-0">
                    <h5 className="mb-3">Category & Brand</h5>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Category</label>
                            <select className="form-select" value={basicInfo.categoryId} onChange={(e) => handleCategoryChange(e.target.value)}>
                                <option value="1">Smartphones</option>
                                <option value="2">Laptops</option>
                                <option value="3">Smart Watches</option>
                                <option value="4">Headphones</option>
                                <option value="5">Cameras</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Brand</label>
                            <select className="form-select" value={basicInfo.brandId} onChange={(e) => setBasicInfo({...basicInfo, brandId: e.target.value})}>
                                <option value="1">Apple</option>
                                <option value="2">Samsung</option>
                                <option value="3">Sony</option>
                                <option value="4">Dell</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* 2. ОСНОВНА ІНФОРМАЦІЯ */}
                <div className="card p-4 shadow-sm border-0">
                    <h5 className="mb-3">Basic Info</h5>
                    <div className="mb-3">
                        <label className="form-label">Product Name</label>
                        <input required className="form-control" value={basicInfo.name} onChange={e => setBasicInfo({...basicInfo, name: e.target.value})} />
                    </div>
                    <div className="row g-3 mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Price ($)</label>
                            <input required type="number" step="0.01" className="form-control" value={basicInfo.price} onChange={e => setBasicInfo({...basicInfo, price: e.target.value})} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Total Stock</label>
                            <input required type="number" className="form-control" value={basicInfo.stockQuantity} onChange={e => setBasicInfo({...basicInfo, stockQuantity: e.target.value})} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea required className="form-control" rows={3} value={basicInfo.description} onChange={e => setBasicInfo({...basicInfo, description: e.target.value})} />
                    </div>
                </div>

                {/* 3. ЗОБРАЖЕННЯ */}
                <div className="card p-4 shadow-sm border-0">
                    <h5 className="mb-3">Images (URLs)</h5>
                    <div className="mb-3">
                        <label className="form-label">Main Image URL</label>
                        <input required className="form-control" placeholder="/img/products/..." value={basicInfo.imageUrl} onChange={e => setBasicInfo({...basicInfo, imageUrl: e.target.value})} />
                    </div>
                    <label className="form-label">Gallery</label>
                    {gallery.map((url, idx) => (
                        <div key={idx} className="d-flex gap-2 mb-2">
                            <input className="form-control" placeholder="Gallery URL" value={url} onChange={e => handleGalleryChange(idx, e.target.value)} />
                            <button type="button" className="btn btn-outline-danger" onClick={() => removeGalleryField(idx)}><FiTrash2/></button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-sm btn-outline-dark mt-2" onClick={addGalleryField}><FiPlus/> Add Image</button>
                </div>

                {/* 4. ХАРАКТЕРИСТИКИ (ДИНАМІЧНІ) */}
                <div className="card p-4 shadow-sm border-0">
                    <h5 className="mb-3">Specifications</h5>
                    {specs.map((item, idx) => (
                        <div key={idx} className="row g-2 mb-2">
                            <div className="col-5">
                                <input className="form-control" placeholder="Key (e.g. CPU)" value={item.key} onChange={e => handleSpecChange(idx, 'key', e.target.value)} />
                            </div>
                            <div className="col-6">
                                <input className="form-control" placeholder="Value (e.g. M1 Pro)" value={item.value} onChange={e => handleSpecChange(idx, 'value', e.target.value)} />
                            </div>
                            <div className="col-1">
                                <button type="button" className="btn btn-outline-danger w-100" onClick={() => removeSpecField(idx)}><FiTrash2/></button>
                            </div>
                        </div>
                    ))}
                    <button type="button" className="btn btn-sm btn-outline-dark mt-2" onClick={addSpecField}><FiPlus/> Add Custom Spec</button>
                </div>

                {/* 5. КОЛЬОРИ */}
                <div className="card p-4 shadow-sm border-0">
                    <h5 className="mb-3">Colors & Stock</h5>
                    {colors.map((item, idx) => (
                        <div key={idx} className="row g-2 mb-2 align-items-center">
                            <div className="col-4">
                                <input className="form-control" placeholder="Name" value={item.name} onChange={e => handleColorChange(idx, 'name', e.target.value)} />
                            </div>
                            <div className="col-2">
                                <input type="color" className="form-control form-control-color w-100" value={item.hex} onChange={e => handleColorChange(idx, 'hex', e.target.value)} />
                            </div>
                            <div className="col-3">
                                <input type="number" className="form-control" placeholder="Qty" value={item.quantity} onChange={e => handleColorChange(idx, 'quantity', parseInt(e.target.value))} />
                            </div>
                            <div className="col-1">
                                <button type="button" className="btn btn-outline-danger w-100" onClick={() => removeColorField(idx)}><FiTrash2/></button>
                            </div>
                        </div>
                    ))}
                    <button type="button" className="btn btn-sm btn-outline-dark mt-2" onClick={addColorField}><FiPlus/> Add Color</button>
                </div>

                <button type="submit" className="btn btn-dark btn-lg w-100">Create Product</button>
            </form>
        </div>
    );
}