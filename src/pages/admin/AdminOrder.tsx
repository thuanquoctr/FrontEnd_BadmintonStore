import React, { useEffect, useState } from "react";
import { Order } from "../../models/Order.model";
import { useAuth } from "../../hookCustom/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SpinnerLoading from "../../components/common/SpinnerLoading";

const AdminOrder: React.FC = () => {
  const { user, token } = useAuth();
  const [listOrder, setListOrder] = useState<Order[]>([]);
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getAllOrders();
  }, []);
  const getAllOrders = async () => {
    if (user) {
      setIsloading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          setTimeout(() => {
            setListOrder(response.data);
            setIsloading(false);
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/loginAccount");
    }
  };
  const orderStatusDescriptions: {
    [key: string]: { label: string; color: string };
  } = {
    CHUA_XAC_NHAN: {
      label: "Chưa xác nhận",
      color: "badge bg-warning text-dark",
    },
    DA_XAC_NHAN: {
      label: "Đã xác nhận, Đang chờ vận chuyển",
      color: "badge bg-info text-dark",
    },
    DANG_GIAO_HANG: { label: "Đang giao hàng", color: "badge bg-primary" },
    DA_GIAO_HANG: { label: "Đã giao hàng", color: "badge bg-success" },
    DA_HUY: { label: "Đã hủy", color: "badge bg-danger" },
  };
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  return (
    <>
      {isloading && <SpinnerLoading />}
      {!isloading && (
        <div className="min-vh-100 bg-light pt-4">
          <div className="row justify-content-center">
            <div>
              <h3 className="my-4">QUẢN LÍ SẢN PHẨM</h3>
            </div>
            <div className="col-md-10">
              <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                  <tr>
                    <th>STT</th>
                    <th>Mã Đơn Hàng</th>
                    <th>Trạng Thái</th>
                    <th>Tổng Tiền</th>
                    <th>Thời Gian</th>
                    <th>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {listOrder.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-3">
                            <p className="fw-bold mb-1">{index + 1}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">{item.code_oder}</p>
                      </td>
                      <td>
                        <span
                          className={
                            orderStatusDescriptions[item.status ?? ""].color
                          }
                        >
                          {orderStatusDescriptions[item.status ?? ""].label}
                        </span>
                      </td>
                      <td>{formatCurrency(item.priceTotal ?? 0)}</td>
                      <td>{new Date(item.createDate ?? 0).toLocaleString()}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-link btn-sm btn-rounded"
                          onClick={() =>
                            navigate(`/admin/AdminStatusOrder/${item.id}`)
                          }
                        >
                          Xem
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AdminOrder;
