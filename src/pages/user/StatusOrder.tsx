import { Breadcrumbs, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CartItemType from "../../models/CartItem.model";
import axios from "axios";
import { useAuth } from "../../hookCustom/AuthContext";
import CartItem from "../../components/user/CartItem";

const StatusOrder: React.FC = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [listProduct, setListProduct] = useState<CartItemType[]>([]);
  const handleOnchange = () => {};
  const handleOnchangQuantity = () => {};
  useEffect(() => {
    if (user) {
      try {
        const response = axios
          .get(`http://localhost:8080/api/orderdetails/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => setListProduct(response.data))
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/loginAccount");
    }
  }, []);
  return (
    <div className="min-vh-100 bg-light pt-4 px-5">
      <div className="row">
        <div className="breadcrumbs-container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Trang Chủ
            </Link>
            <Link underline="hover" color="inherit" href="/cartPage">
              Đơn Hàng
            </Link>
            <Typography color="text.primary">Chi Tiết Hóa Đơn</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="row p-3 border border-dark-subtle">
        <div className="row my-5">
          {listProduct.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              disable={true}
              onChange={handleOnchange}
              onChangeQuantity={handleOnchangQuantity}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default StatusOrder;
