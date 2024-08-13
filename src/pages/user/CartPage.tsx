import React, { useEffect, useState } from "react";
import CartItem from "../../components/user/CartItem";
import axios from "axios";
import { useAuth } from "../../hookCustom/AuthContext";
import { useNavigate } from "react-router-dom";
import SpinnerLoading from "../../components/common/SpinnerLoading";
import CartItemType from "../../models/CartItem.model";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import ButtonField from "../../components/common/ButtonField";
import LocationSelect from "../../components/user/ProvinceSelect";
import TextField from "../../components/common/TextField";
import SwalField from "../../components/common/SwalField";

const CartPage: React.FC = () => {
  const { user, token, getCountCart } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(0);
  const [listItem, setListItem] = useState<CartItemType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const handleChange = () => {
    setChange(change + 1);
  };
  const handleChangeQuantity = () => {
    if (user && user.id !== undefined) {
      getAmountByUserId(user.id);
    }
  };
  useEffect(() => {
    setLoading(true);
    if (!user) {
      navigate("/loginAccount");
    } else {
      loadingCartItems();
      if (user && user.id !== undefined) {
        getAmountByUserId(user.id);
      }
    }
  }, [user, navigate, change]);

  const loadingCartItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/carts/getItemByUser/${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        setTimeout(() => {
          setListItem(response.data);
          setLoading(false);
        }, 1000);
      } else {
        console.log("error loading cart item");
      }
    } catch (error) {
      navigate("/loginAccount");
    }
  };
  if (loading) {
    return <SpinnerLoading />;
  }
  const getAmountByUserId = async (id: number) => {
    try {
      const response = await axios
        .get(`http://localhost:8080/api/carts/getAmountByUserId/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setTotalPrice(response.data))
        .catch((error) => console.log(error));
    } catch (error) {
      return;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  // const handleBuy = async () => {
  //   if (user) {
  //     try {
  //       const response = await axios.post(
  //         `http://localhost:8080/api/orders/createOrder/${user.id}`,
  //         {
  //           receiverName: name,
  //           receiverPhone: phone,
  //           receiverAddress: street,
  //           priceTotal: totalPrice,
  //           orderDetails: listItem,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       if (response.data) {
  //         SwalField({ icon: "success", title: "Đặt hàng thành công" });
  //         navigate("/");
  //       } else {
  //         SwalField({ icon: "error", title: "Đặt hàng thất bại" });
  //       }
  //     } catch (error) {}
  //   } else {
  //     navigate("/loginAccount");
  //   }
  // };

  return (
    <>
      {user && listItem.length > 0 && (
        <div className="min-vh-100 bg-light pt-4">
          <div className="breadcrumbs-container">
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Trang Chủ
              </Link>
              <Typography color="text.primary">Giỏ Hàng</Typography>
            </Breadcrumbs>
          </div>
          <div className="container d-flex flex-column flex-md-row justify-content-center px-3">
            <div className="rounded bg-white shadow p-3 col-12 col-md-8 mb-4 mb-md-0">
              {listItem.map((item) => (
                <CartItem
                  key={item.id}
                  onChange={handleChange}
                  item={item}
                  onChangeQuantity={handleChangeQuantity}
                />
              ))}
            </div>
            <div className="rounded bg-white p-3 shadow col-12 col-md-4">
              <div className="d-flex justify-content-between mb-2">
                <p className="text-dark">Tạm Tính</p>
                <p className="text-dark">{formatCurrency(totalPrice)}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="text-dark">Phí Vận Chuyển</p>
                <p className="text-dark">{formatCurrency(30000)}</p>
              </div>
              <hr className="my-3" />
              <div className="d-flex justify-content-between">
                <p className="h5 fw-bold">Tổng Tiền</p>
                <div>
                  <p className="h5 fw-bold m-0">
                    {formatCurrency(totalPrice + 30000)}
                  </p>
                  <p className="text-muted small">Đã Bao gồm VAT</p>
                </div>
              </div>

              <ButtonField
                onClick={() => navigate("/orderPage")}
                width="100%"
                children="Hoàn Tất Hóa Đơn"
              />
            </div>
          </div>
        </div>
      )}
      {user && listItem.length == 0 && (
        <div className="min-vh-100 bg-light">
          <h1
            style={{
              color: "#eb5844",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            Giỏ Hàng Trống
          </h1>
        </div>
      )}
    </>
  );
};

export default CartPage;
