import React, { useState } from "react";
import Product from "../../models/Product.model";
const Card = React.lazy(() => import("./Card"));

type product = {
  products: Product[];
};

const CardList: React.FC<product> = ({ products }) => {
  return (
    <>
      <div className="row m-5">
        <h1
          className="fw-bold text-white py-2"
          style={{ background: "#eb5844" }}
        >
          VỢT CẦU LONG
        </h1>
        {products
          .filter((item) => item.category?.name === "Vợt cầu lông")
          .map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              pictureMain={item.pictureMain}
              price={item.price}
            />
          ))}
        <h1
          className="fw-bold text-white py-2"
          style={{ background: "#eb5844" }}
        >
          TÚI
        </h1>
        {products
          .filter((item) => item.category?.name === "Túi Đựng Vợt")
          .map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              pictureMain={item.pictureMain}
              price={item.price}
            />
          ))}
        <h1
          className="fw-bold text-white py-2"
          style={{ background: "#eb5844" }}
        >
          GIÀY
        </h1>
        {products
          .filter((item) => item.category?.name === "Giày cầu lông")
          .map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              pictureMain={item.pictureMain}
              price={item.price}
            />
          ))}
        <h1
          className="fw-bold text-white py-2"
          style={{ background: "#eb5844" }}
        >
          TRANG PHỤC
        </h1>
        {products
          .filter((item) => item.category?.name === "Trang phục cầu lông")
          .map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              pictureMain={item.pictureMain}
              price={item.price}
            />
          ))}
      </div>
    </>
  );
};
export default CardList;
