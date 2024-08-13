import React, { useState } from "react";
import CartItemType from "../../models/CartItem.model";
import axios from "axios";
import { useAuth } from "../../hookCustom/AuthContext";
import SwalField from "../common/SwalField";
import SwalYesNo from "../common/SwalYesNo";

type Props = {
  item: CartItemType;
  disable?: boolean;
  onChange: () => void;
  onChangeQuantity: () => void;
};

const CartItem: React.FC<Props> = ({
  item,
  onChange,
  onChangeQuantity,
  disable = false,
}) => {
  const { user, token, getCountCart } = useAuth();
  const [quantity, setQuantity] = useState<number>(
    item.quantity !== undefined ? item.quantity : 1
  );
  const imageUrl = `http://localhost:8080/api/products/image/${item.product?.pictureMain}`;
  const totalPrice =
    item.product?.price !== undefined ? quantity * item.product?.price : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const formatTitle = (title: string) => {
    return title.length > 15 ? title.slice(0, 15) + "..." : title;
  };

  const handleRemoveCartItem = async (
    id: number | undefined,
    product_id: number | undefined
  ) => {
    const confirmed = await SwalYesNo();
    if (user && confirmed && id !== undefined && product_id !== undefined) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/api/carts/removeCartItemByUserId/${user.id}/${product_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data) {
          SwalField({ icon: "success", title: "Đã xóa" });
          onChange();
          if (user.id !== undefined) {
            getCountCart(user.id);
          }
        } else {
          SwalField({ icon: "error", title: "Xóa thất bại" });
        }
      } catch (error) {
        SwalField({ icon: "error", title: "Xóa thất bại" });
      }
    } else {
      return;
    }
  };
  const handleOnChange = (value: number) => {
    setQuantity(value);
    if (user && user.id !== undefined) {
      getCountCart(user.id);
    }
  };
  const handleIncrement = async () => {
    setQuantity(quantity + 1);
    try {
      if (user && user.id !== undefined) {
        await axios.put(
          `http://localhost:8080/api/carts/handleIncrementById/${user.id}/${item.product?.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      onChangeQuantity();
    } catch (error) {
      return;
    }
    if (user && user.id !== undefined) {
      getCountCart(user.id);
    }
  };
  const handleDecrement = async () => {
    setQuantity(quantity - 1);
    try {
      if (user && user.id !== undefined) {
        await axios.put(
          `http://localhost:8080/api/carts/handleDecrementById/${user.id}/${item.product?.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      onChangeQuantity();
      if (quantity - 1 === 0) {
        onChange();
      }
    } catch (error) {
      return;
    }
    if (user && user.id !== undefined) {
      getCountCart(user.id);
    }
  };
  return (
    <div className="row mb-4 rounded bg-white p-3 shadow-sm align-items-center">
      <div className="col-xs-12 col-md-3 d-flex justify-content-center">
        <img
          src={imageUrl}
          alt="product-image"
          className="img-fluid rounded"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      <div className="col-xs-12 col-md-3 d-flex flex-column justify-content-center">
        <h2 className="h5 text-dark m-0">
          {formatTitle(item.product?.title || "")}
        </h2>
        <p className="text-muted small m-0">{item.product?.brand}</p>
      </div>
      <div className="col-xs-12 col-md-6 d-flex align-items-center justify-content-between">
        {!disable ? (
          <div className="d-flex align-items-center me-2">
            <button
              onClick={handleDecrement}
              className="btn btn-outline-secondary px-3 me-3"
            >
              -
            </button>
            <input
              className="form-control text-center border-0"
              type="number"
              value={quantity}
              onChange={(e) => handleOnChange(Number(e.target.value))}
              min="1"
              style={{ width: "60px" }}
            />
            <button
              onClick={handleIncrement}
              className="btn btn-outline-secondary px-3"
            >
              +
            </button>
          </div>
        ) : (
          <div className="d-flex align-items-center me-2">
            <b>
              {item.product?.price !== undefined
                ? formatCurrency(item.product?.price)
                : item.product?.price}{" "}
            </b>
            <b className="mx-3">x</b> <b> {quantity}</b>
          </div>
        )}
        <div className="d-flex align-items-center">
          <p className="fw-bolder mb-0">{formatCurrency(totalPrice)}</p>
          {!disable && (
            <svg
              onClick={() => handleRemoveCartItem(item.id, item.product?.id)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="ms-3"
              style={{ width: "20px", height: "20px", cursor: "pointer" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
