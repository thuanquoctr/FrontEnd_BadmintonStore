import axios from "axios";
import React, { useEffect, useState } from "react";
import SpinnerLoading from "../../components/common/SpinnerLoading";
import Product from "../../models/Product.model";
import { useNavigate } from "react-router-dom";
const AdminProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [isloading, setIsloading] = useState(false);
  useEffect(() => {
    setIsloading(true);
    const getAllProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products`);
        setTimeout(() => {
          setListProduct(response.data);
          setIsloading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProducts();
  }, []);
  return (
    <>
      {isloading && <SpinnerLoading />}
      {!isloading && (
        <div>
          <div className="row d-flex justify-content-between align-items-center">
            <div>
              <h3 className="mt-4">QUẢN LÍ SẢN PHẨM</h3>
            </div>
            <div>
              <button
                onClick={() => navigate(`/admin/addProduct`)}
                className="btn btn-danger my-4"
              >
                Thêm Sản Phẩm
              </button>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-10">
              <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">ẢNH</th>
                    <th scope="col">TÊN</th>
                    <th scope="col">LOẠI</th>
                    <th scope="col">GIÁ</th>
                    <th scope="col">SỐ LƯỢNG</th>
                    <th scope="col">ĐÃ BÁN</th>
                    <th scope="col">THAO TÁC</th>
                  </tr>
                </thead>
                <tbody>
                  {listProduct.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                          src={`http://localhost:8080/api/products/image/${item.pictureMain}`}
                          alt=""
                        />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.brand}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.quantitySold}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm px-3"
                        >
                          <i className="fas fa-times"></i>
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
export default AdminProductPage;
