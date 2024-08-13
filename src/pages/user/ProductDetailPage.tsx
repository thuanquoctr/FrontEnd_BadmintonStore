import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpinnerLoading from "../../components/common/SpinnerLoading";
import axios from "axios";
import Product from "../../models/Product.model";
import ProductDetail from "../../components/user/ProductDetail";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<Product>({});

  useEffect(() => {
    const getCategoryById = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/${id}`
        );
        setTimeout(() => {
          setProduct(response.data);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    };
    getCategoryById();
  }, []);

  return (
    <div>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <ProductDetail
          id={product.id}
          title={product.title}
          pictureMain={product.pictureMain}
          description={product.description}
          brand={product.brand}
          view={product.view}
          category={product.category}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;
