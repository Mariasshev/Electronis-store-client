"use client";

import Hero from "../components/Hero";
import BrowseCategories from "../components/BrowseCategories";
import Discount from "../components/Discount";
import Banner from "../components/Banner";
import ProductsTabs from "../components/ProductsTabs";
import SaleBanner from "../components/SaleBanner";


export default function Home() {
  return (
    <>
      <Hero />
      <BrowseCategories />
      <ProductsTabs />
      <Banner />
      <Discount />
       <SaleBanner />
    </>
  );
}
