import axios from "axios";
import React, { useEffect, useState } from "react";
import Account from "../../models/Account.model";
import SpinnerLoading from "../../components/common/SpinnerLoading";
import { useAuth } from "../../hookCustom/AuthContext";
import { useNavigate } from "react-router-dom";
const AdminAccountPage: React.FC<Account> = () => {
  const [account, setAccount] = useState<Account[]>([]);
  const [isloading, setIsloading] = useState(false);
  const { user, token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    setIsloading(true);
    if (user) {
      const response = axios
        .get(`http://localhost:8080/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) =>
          setTimeout(() => {
            setAccount(response.data);
            setIsloading(false);
          }, 1000)
        )
        .catch((error) => console.log(error));
    } else {
      navigate("/loginAccount");
    }
  }, []);
  return (
    <>
      {isloading && <SpinnerLoading />}
      {!isloading && (
        <div>
          <div className="row d-flex justify-content-between align-items-center">
            <div>
              <h3 className="mt-4">QUẢN LÍ NGƯỜI DÙNG</h3>
            </div>
            <div>
              <button
                // onClick={() => navigate(`/admin/addProduct`)}
                className="btn btn-danger my-4"
              >
                Thêm người dùng mới
              </button>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-10 table-responsive">
              <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">TÊN</th>
                    <th scope="col">HỌ</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">SỐ ĐIỆN THOẠI</th>
                    <th scope="col">THAO TÁC</th>
                  </tr>
                </thead>
                <tbody>
                  {account.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
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
export default AdminAccountPage;
