"use client";

import Breadcrumbs from "./Breadcrumbs";
import ProductTop from "./ProductTop";
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";

export default function ProductPage() {
  return (
      <div style={{ background: "#fff", color: "#111", minHeight: "100vh" }}>
    <div className="container py-4 py-lg-5">
      <Breadcrumbs />

      <ProductTop />

      {/* Details block */}
      <div className="mt-5">
        <ProductDetails />
      </div>

      <div className="mt-5">
        <ProductReviews />
      </div>
      <div className="mt-5">
        <RelatedProducts />
      </div>
    </div>
    </div>
  );
}
