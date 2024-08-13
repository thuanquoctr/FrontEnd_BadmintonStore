import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CartItemType from "../../models/CartItem.model";
import axios from "axios";
import { useAuth } from "../../hookCustom/AuthContext";
import CartItem from "../../components/user/CartItem";
import { Order } from "../../models/Order.model";
import SwalField from "../../components/common/SwalField";

const AdminStatusOrder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [listProduct, setListProduct] = useState<CartItemType[]>([]);
  const [order, setorder] = useState<Order>({});
  console.log(order);

  useEffect(() => {
    getAllItem();
    getStatus();
  }, []);
  const getAllItem = () => {
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
  };
  const getStatus = () => {
    if (user) {
      try {
        const response = axios
          .get(`http://localhost:8080/api/orders/getById/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => setorder(response.data))
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/loginAccount");
    }
  };
  const handleOnchange = () => {};
  const handleOnchangQuantity = () => {};
  const handleChangeStatus = async (e: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/orders/changeStatus/${id}`,
        {
          params: {
            status: e,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        SwalField({ icon: "success", title: "Thay đổi trạng thái thành công" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-vh-100 bg-light pt-4 px-5">
      <div className="row p-3 border border-dark-subtle">
        <div className="row">
          <div className="d-flex justify-content-between">
            {/* <p className="fw-bold">
              <h4>Thông tin đơn hàng</h4>
            </p> */}
            {/* <p className="text-end">
              <p className="mt-1">statusOrderId.codeOrder</p>
              <br /> */}
            {/* <p
                className={`p-1 ${
                  statusOrderId.status === "CHUA_XAC_NHAN"
                    ? "bg-danger"
                    : statusOrderId.status === "DA_XAC_NHAN"
                    ? "bg-warning"
                    : statusOrderId.status === "DANG_GIAO_HANG"
                    ? "bg-primary"
                    : statusOrderId.status === "DA_GIAO_HANG"
                    ? "bg-success"
                    : statusOrderId.status === "DA_HUY"
                    ? "bg-secondary"
                    : ""
                } text-white fw-bold`}
                style={{ borderRadius: "15px" }}
              > */}
            {/* statusOrderId.status.description */}
            {/* </p>
            </p> */}
          </div>
          <hr />
        </div>
        <div className="row">
          {/* <div className="d-flex justify-content-between">
            <p>
              <b>Thông Tin Khách Hàng</b>
              <br />
              <b>Tên: </b> statusOrderId.receiverName
              <br />
              <b>Địa Chỉ: </b> statusOrderId.receiverAddress
              <br />
              <b>Email: </b> statusOrderId.receiverEmail
              <br />
              <b>Ngày Đặt Hàng: </b> statusOrderId.receiverEmail
              <br />
            </p>
          </div> */}
        </div>
        <div className="row">
          <h4>Thay Đổi Trạng Thái Đơn Hàng</h4>
          <form method="post">
            <select
              className="form-select"
              name="statusOrderById"
              onChange={(e) => handleChangeStatus(e.target.value)}
              aria-label="Default select example"
            >
              <option selected={order.status === "CHUA_XAC_NHAN"} value="1">
                Chưa xác nhận
              </option>
              <option selected={order.status === "DA_XAC_NHAN"} value="2">
                Đã xác nhận, Đang chờ vận chuyển
              </option>
              <option selected={order.status === "DANG_GIAO_HANG"} value="3">
                Đang giao hàng
              </option>
              <option selected={order.status === "DA_GIAO_HANG"} value="4">
                Đã giao hàng
              </option>
              <option selected={order.status === "DA_HUY"} value="5">
                Đã hủy
              </option>
            </select>
          </form>
        </div>
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
export default AdminStatusOrder;
