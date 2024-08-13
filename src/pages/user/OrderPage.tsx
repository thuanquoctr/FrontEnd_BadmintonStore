import { Breadcrumbs, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from "../../components/common/TextField";
import axios from "axios";
import CartItemType from "../../models/CartItem.model";
import { useAuth } from "../../hookCustom/AuthContext";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/user/CartItem";
import TextareaField from "../../components/common/TextareaField";
import ButtonField from "../../components/common/ButtonField";
import SpinnerLoading from "../../components/common/SpinnerLoading";
import { Address } from "../../models/Address.model";
import ComboboxAddress from "../../components/common/ComboboxAddress";
import TextError from "../../components/common/TextError";
import SwalField from "../../components/common/SwalField";

const OrderPage: React.FC = () => {
  const { user, token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [listItem, setListItem] = useState<CartItemType[]>([]);
  const [change, setChange] = useState(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [listAddress, setListAddress] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState(0);
  const [selectedAddressIdEror, setSelectedAddressIdEror] = useState("");
  const handleAddressChange = (selectedAddressId: number) => {
    setSelectedAddressId(selectedAddressId);
  };
  const [note, setNote] = useState("");
  const handleChange = () => {
    setChange(change + 1);
  };
  const handleChangeQuantity = () => {
    if (user && user.id !== undefined) {
      getAmountByUserId(user.id);
    }
  };
  const getAmountByUserId = async (id: number) => {
    try {
      setIsLoading(true);
      const response = await axios
        .get(`http://localhost:8080/api/carts/getAmountByUserId/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setTimeout(() => {
            setTotalPrice(response.data);
            setIsLoading(false);
          }, 1000);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      return;
    }
  };
  useEffect(() => {
    loadingCartItems();
    getAllAddress();
    if (user && user.id !== undefined) {
      getAmountByUserId(user.id);
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
        setListItem(response.data);
      } else {
        console.log("error loading cart item");
      }
    } catch (error) {
      navigate("/loginAccount");
    }
  };
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  const getAllAddress = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setListAddress(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOrder = async () => {
    if (user) {
      if (selectedAddressId === 0) {
        setSelectedAddressIdEror("Vui lòng chọn địa chỉ");
        return;
      } else {
        setSelectedAddressIdEror("");
      }
      try {
        const response = await axios.post(
          `http://localhost:8080/api/orders`,
          {
            receiverNote: note,
            priceTotal: totalPrice,
            user: user,
            status: "CHUA_XAC_NHAN",
            orderDetails: listItem,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data) {
          SwalField({
            icon: "success",
            title: "Đặt hàng thành công",
          });
          navigate("/historyOrder");
        } else {
          SwalField({
            icon: "error",
            title: "Đặt hàng thất bại, vui lòng thử lại sau",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {isLoading && <SpinnerLoading />}
      {!isLoading && (
        <div className="min-vh-100 bg-light pt-4">
          <div className="row">
            <div className="breadcrumbs-container">
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                  Trang Chủ
                </Link>
                <Link underline="hover" color="inherit" href="/historyOrder">
                  Giỏ Hàng
                </Link>
                <Typography color="text.primary">Hoàn Tất Hóa Đơn</Typography>
              </Breadcrumbs>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="mb-3">
                <label className="form-label">
                  Chọn Địa Chỉ <span className="text-danger fw-bold">*</span>
                </label>
                <ComboboxAddress
                  address={listAddress}
                  onAddressChange={handleAddressChange}
                />
                <TextError children={selectedAddressIdEror} />
                <div className="mt-2">
                  {" "}
                  <ButtonField
                    background="#4169E1"
                    children="Thêm Địa Chỉ"
                    onClick={() => navigate("/addAddress")}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Ghi Chú Đơn Hàng </label>
                <TextareaField
                  placeholder="Ghi chú đơn hàng..."
                  value={note}
                  onChange={(e) => setNote(e)}
                />
              </div>
              <div className="mt-2">
                {" "}
                <ButtonField
                  children="Tiến Hành Đặt Hàng"
                  onClick={handleOrder}
                />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h3 className="text-center">Sản Phẩm Mua</h3>
              <h4>Tổng Tiền : {formatCurrency(totalPrice)} </h4>
              {listItem.map((item) => (
                <CartItem
                  key={item.id}
                  disable={true}
                  onChange={handleChange}
                  item={item}
                  onChangeQuantity={handleChangeQuantity}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderPage;
