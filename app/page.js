"use client";
import { useEffect, useState } from "react";
import Banner from "./_components/bannerc/Banner";
import CategorySlider from "./_components/categoryc/CategorySlider";
import Discover from "./_components/discoverc/Discover";
import axios from "axios";
import ProductCard from "./_components/productc/ProductCard";
import BannerWithProduct from "./_components/bannerc/BannerWithProduct";
import Spinner from "./_components/spinnerc/Spinner";
import ImageHover from "./_components/codegarage/ImageHover";


export default function Home() {
  
  const [data, setData] = useState(null);
  const [bannerHomeData, setBannerHomeData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const CategorySliderData = await axios(
        "http://localhost:8080/categorysliderdata"
      );
      console.log(CategorySliderData);
      setData(CategorySliderData.data);

      const BannerHome = await axios("http://localhost:8080/bannerhome");
      setBannerHomeData(BannerHome.data);
      console.log(BannerHome.data);
      const ProductData = await axios("http://localhost:8080/productcard");
      setProductData(ProductData.data);
      console.log(ProductData.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div><Spinner/></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
    
      <Discover />
      <div className="gap30px"></div>
      <CategorySlider data={data} />
      <div className="gap30px"></div>
      <Banner data={bannerHomeData} />
      <div className="gap30px"></div>
      <ImageHover/>
      <div className="gap30px"></div>
      <BannerWithProduct />
      <div className="gap30px"></div>
      <ProductCard data={productData} />
      <div className="gap30px"></div>
      <Banner data={bannerHomeData} />
      <div className="gap30px"></div>
      <CategorySlider data={data} />
      <div className="gap30px"></div>
      <BannerWithProduct />
      <div className="gap30px"></div>
    </>
  );
}
