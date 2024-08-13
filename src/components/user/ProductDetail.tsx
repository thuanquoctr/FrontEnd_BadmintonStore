import React, { useState } from "react";
import Product from "../../models/Product.model";
import TextField from "../common/TextField";
import ButtonField from "../common/ButtonField";
import { useAuth } from "../../hookCustom/AuthContext";
import axios from "axios";
import SwalField from "../common/SwalField";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs, Link, Typography } from "@mui/material";

type Props = Product;
const ProductDetail: React.FC<Props> = ({
  id,
  title,
  pictureMain,
  description,
  brand,
  view,
  category,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const imageUrl = `http://localhost:8080/api/products/image/${pictureMain}`;
  const handleOnChange = (value: number) => {
    setQuantity(value);
  };
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const { user, token, getCountCart } = useAuth();
  const navigate = useNavigate();
  const handleAddCart = async () => {
    if (user) {
      if (id !== undefined) {
        try {
          const response = await axios.post(
            `http://localhost:8080/api/carts/addCart/${user.id}/${id}/${quantity}`,
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
    <>
      <div className="row m-3">
        <div className="breadcrumbs-container mt-4">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Trang Chủ
            </Link>
            {/* <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
              >
                Core
              </Link> */}
            <Typography color="text.primary">Chi Tiết Sản Phẩm</Typography>
          </Breadcrumbs>
        </div>
        <div className="col-sm-6 p-5 text-center">
          <img
            style={{
              objectFit: "cover",
              width: "100%",
              maxWidth: "400px",
              height: "400px",
            }}
            src={pictureMain != undefined ? imageUrl : ""}
            alt="imgproductdetail"
          />
        </div>
        <div className="col-sm-6 p-4">
          <h4 className="my-4 fw-bold">{title}</h4>
          <p>
            Tình Trạng :
            <b>
              Còn Hàng <i className="bi bi-check-circle-fill text-success"></i>
            </b>
          </p>
          <p>
            Loại Sản Phẩm <b>{category?.name}</b>
          </p>
          <p>
            Hãng Sản Xuất :<b>{brand}</b>
          </p>
          <hr style={{ borderTop: "4px solid black" }} />
          <div className="input-group mb-3">
            <label className="d-flex align-items-center justify-content-center me-4">
              Số Lượng
            </label>
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
          </div>
          <ButtonField onClick={handleAddCart} children="Thêm Vào Giỏ Hàng" />
          <p>
            Đang có <b>{view}</b> người cùng xem sản phẩm này
          </p>
        </div>
      </div>
      <div className="row m-3">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Mô Tả Sản Phẩm
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p>{description}</p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Đánh Giá Sản Phẩm
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>This is the second item's accordion body.</strong> It is
                hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions. You can modify any of this with
                custom CSS or overriding our default variables. It's also worth
                noting that just about any HTML can go within the{" "}
                <code>.accordion-body</code>, though the transition does limit
                overflow.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetail;
