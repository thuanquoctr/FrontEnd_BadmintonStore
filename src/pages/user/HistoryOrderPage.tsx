import { Breadcrumbs, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Order } from "../../models/Order.model";
import { useAuth } from "../../hookCustom/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HistoryOrderPage: React.FC = () => {
  const { user, token } = useAuth();
  const [listOrder, setListOrder] = useState<Order[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      try {
        const response = axios
          .get(`http://localhost:8080/api/orders/${user.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => setListOrder(response.data))
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
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
    <div className="min-vh-100 bg-light pt-4">
      <div className="row">
        <div className="breadcrumbs-container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Trang Chủ
            </Link>
            <Typography color="text.primary">Đơn Hàng Của Bạn</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
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
                      onClick={() => navigate(`/statusOrder/${item.id}`)}
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
  );
};
export default HistoryOrderPage;
