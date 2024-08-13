import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hookCustom/AuthContext";
import { useNavigate } from "react-router-dom";
import { Order } from "../../models/Order.model";
import Product from "../../models/Product.model";
import SpinnerLoading from "../../components/common/SpinnerLoading";

const AdminDashboardPage: React.FC = () => {
  const { user, token } = useAuth();
  const [order, setOrder] = useState<Order[]>([]);
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const getTotalAmountForDeliveredOrders = () => {
    return order
      .filter((o) => o.status === "DA_GIAO_HANG")
      .reduce(
        (total, currentOrder) => total + (currentOrder.priceTotal ?? 0),
        0
      );
  };

  const getAllProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTimeout(() => {
        setListProduct(data);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllOrder();
    getAllProducts();
  }, []);
  const getAllOrder = async () => {
    if (user) {
      try {
        setIsloading(true);
        const response = await axios.get(`http://localhost:8080/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          setTimeout(() => {
            setOrder(response.data);
            setIsloading(false);
          }, 1000);
        }
      } catch (error) {
        console.log("errror");
      }
    } else {
      navigate("/loginAccount");
    }
  };
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
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
  return (
    <>
      {isloading && <SpinnerLoading />}
      {!isloading && (
        <div className="container my-5">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h1>Bảng Điều Khiển Doanh Thu Admin</h1>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card card-custom">
                <div className="card-header card-header-custom text-center">
                  <h5>Tổng Đơn Hàng</h5>
                </div>
                <div className="card-body card-body-custom text-center">
                  <h2 className="text-primary">{order.length}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card card-custom">
                <div className="card-header card-header-custom text-center">
                  <h5>Tổng Doanh Thu</h5>
                </div>
                <div className="card-body card-body-custom text-center">
                  <h2 className="text-success">
                    {formatCurrency(getTotalAmountForDeliveredOrders())}
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card card-custom">
                <div className="card-header card-header-custom text-center">
                  <h5>Tổng Sản Phẩm</h5>
                </div>
                <div className="card-body card-body-custom text-center">
                  <h2 className="text-warning">{listProduct.length}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card card-custom">
                <div className="card-header card-header-custom">
                  <h5>Đơn Hàng Gần Đây</h5>
                </div>
                <div className="card-body card-body-custom">
                  <div>
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
                        {order.slice(0, 5).map((item, index) => (
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
                                  orderStatusDescriptions[item.status ?? ""]
                                    .color
                                }
                              >
                                {
                                  orderStatusDescriptions[item.status ?? ""]
                                    .label
                                }
                              </span>
                            </td>
                            <td>{formatCurrency(item.priceTotal ?? 0)}</td>
                            <td>
                              {new Date(item.createDate ?? 0).toLocaleString()}
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-link btn-sm btn-rounded"
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AdminDashboardPage;
