import React, { useEffect, useState } from "react";
import SpinnerLoading from "../../components/common/SpinnerLoading";
import Slider from "../../layouts/Slider";
import CardList from "../../components/user/CardList";
import Product from "../../models/Product.model";

const HomePage: React.FC = () => {
  const [isLoading, setIsloaDing] = useState(false);
  const [listProduct, setListProduct] = useState<Product[]>([]);

  useEffect(() => {
    const getAllProducts = async () => {
      setIsloaDing(true);
      try {
        const response = await fetch("http://localhost:8080/api/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTimeout(() => {
          setIsloaDing(false);
          setListProduct(data);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    };
    getAllProducts();
  }, []);
  return (
    <div className="container-fluid">
      {isLoading && <SpinnerLoading />}
      {!isLoading && <Slider />}
      {!isLoading && <CardList products={listProduct} />}
    </div>
  );
};
export default HomePage;
