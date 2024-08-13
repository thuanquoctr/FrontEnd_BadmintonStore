import React from "react";
import { useNavigate } from "react-router-dom";
import Product from "../../models/Product.model";
import { useAuth } from "../../hookCustom/AuthContext";
import axios from "axios";
import SwalField from "../common/SwalField";

const Card: React.FC<Product> = ({ id, title, pictureMain, price }) => {
  const { getCountCart } = useAuth();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const imageUrl = `http://localhost:8080/api/products/image/${pictureMain}`;
  const handleAddCart = async (id: number | undefined) => {
    if (user !== null) {
      if (id !== undefined) {
        try {
          const response = await axios.post(
            `http://localhost:8080/api/carts/addCart/${user.id}/${id}/1`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data) {
            SwalField({
              icon: "success",
              title: "Thêm vào giỏ hàng thành công",
            });
            if (user.id !== undefined) {
              getCountCart(user.id);
            }
          } else {
            SwalField({
              icon: "error",
              title: "Thêm vào giỏ hàng thất bại",
            });
          }
        } catch (error) {
          SwalField({
            icon: "error",
            title: "Thêm vào giỏ hàng thất bại",
          });
        }
      } else {
        navigate("/");
      }
    } else {
      navigate("/loginAccount");
    }
  };
  return (
    <div className="col-md-3 col-sm-6 ">
      <div className="product-grid">
        <div className="product-image">
          <a className="image">
            <img
              style={{
                objectFit: "cover",
                width: "100%",
                maxWidth: "230px",
                height: "250px",
              }}
              className="img-1"
              src={imageUrl}
              alt="imgMain"
            />
          </a>
          <ul className="product-links">
            <li>
              <a
                style={{ cursor: "pointer" }}
                onClick={() => handleAddCart(id)}
              >
                <i
                  title="Thêm vào giỏ hàng"
                  className="fas fa-shopping-cart"
                ></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i title="Thêm vào yêu thích" className="fa fa-heart"></i>
              </a>
            </li>
            <li>
              <a
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`productDetail/${id}`)}
              >
                <i title="Xem chi tiết" className="fa fa-eye"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="product-content">
          <h5
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`productDetail/${id}`)}
          >
            {title}
          </h5>
          <div className="price text-danger fw-bold">
            {formatCurrency(Number(price))}
          </div>
          <ul className="rating">
            <li className="fas fa-star"></li>
            <li className="fas fa-star"></li>
            <li className="fas fa-star"></li>
            <li className="far fa-star"></li>
            <li className="far fa-star"></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

function formatCurrency(amount: number): string {
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

export default Card;
