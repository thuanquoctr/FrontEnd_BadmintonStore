import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SpinnerLoading from "../../components/common/SpinnerLoading";
import { useNavigate } from "react-router-dom";
import Category from "../../models/Category.model";
import TextField from "../../components/common/TextField";
import ButtonField from "../../components/common/ButtonField";
import TextError from "../../components/common/TextError";
import SwalYesNo from "../../components/common/SwalYesNo";
import SwalField from "../../components/common/SwalField";
import { useAuth } from "../../hookCustom/AuthContext";
const AdminCategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [listCategory, setListCategory] = useState<Category[]>([]);
  const [isloading, setIsloading] = useState(false);
  const [isloadingButton, setIsloadingButton] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryNameError, setCategoryNameError] = useState("");
  const buttonRef = useRef<HTMLDivElement>(null);
  const buttonRefInput = useRef<HTMLDivElement>(null);
  const buttonRefCancel = useRef<HTMLDivElement>(null);
  const buttonRefAdd = useRef<HTMLDivElement>(null);
  const { token, user } = useAuth();
  const vavigate = useNavigate();
  const handleAddCategory = async () => {
    if (categoryName == "") {
      setCategoryNameError("Vui lòng điền tên thể loại");
      return;
    } else {
      setCategoryNameError("");
    }
    setIsloadingButton(true);
    if (user) {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/categories`,
          {
            name: categoryName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTimeout(() => {
          setCategoryName("");
          setIsloadingButton(false);
          SwalField({ title: "Thêm thể loại thành công", icon: "success" });
          getAllCategories();
        }, 1000);
      } catch (error) {
        console.log(error);
        SwalField({ title: "Thêm thể loại thất bại", icon: "error" });
      }
    } else {
      navigate("/loginAccount");
    }
  };
  const handleDeleteClick = async (id: number) => {
    if (user) {
      const confirmed = await SwalYesNo();
      if (confirmed) {
        const response = axios
          .delete(`http://localhost:8080/api/categories/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            SwalField({ icon: "success", title: "Xóa thể loại thành công" });
            getAllCategories();
          })
          .catch(() => {
            SwalField({
              icon: "error",
              title: "Đang có sản phẩm chứa thể loại này !",
            });
          });
      } else {
        return;
      }
    } else {
      navigate("/loginAccount");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  const getAllCategories = async () => {
    setIsloading(true);
    if (user) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/categories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTimeout(() => {
          setListCategory(response.data);
          setIsloading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/loginAccount");
    }
  };
  return (
    <>
      {isloading && <SpinnerLoading />}
      {!isloading && (
        <div>
          <div className="row d-flex justify-content-between align-items-center">
            <div>
              <h3 className="mt-4">QUẢN LÍ THỂ LOẠI</h3>
            </div>
            <div className="my-3" ref={buttonRef}>
              <ButtonField
                children="Thêm Thể Loại"
                onClick={() => {
                  buttonRef.current?.setAttribute("style", "display: none");
                  buttonRefInput.current?.setAttribute(
                    "style",
                    "display: block"
                  );
                  buttonRefCancel.current?.setAttribute(
                    "style",
                    "display: block"
                  );
                  buttonRefAdd.current?.setAttribute("style", "display: block");
                }}
              />
            </div>
            <div
              className="my-3"
              ref={buttonRefCancel}
              style={{ display: "none" }}
            >
              <ButtonField
                children="Hủy"
                background="#5F9EA0"
                onClick={() => {
                  buttonRef.current?.setAttribute("style", "display: block");
                  buttonRefInput.current?.setAttribute(
                    "style",
                    "display: none"
                  );
                  buttonRefCancel.current?.setAttribute(
                    "style",
                    "display: none"
                  );
                  buttonRefAdd.current?.setAttribute("style", "display: none");
                }}
              />
            </div>
            <div ref={buttonRefInput} style={{ display: "none" }}>
              <TextField
                value={categoryName}
                placeholder="Tên thể loại..."
                width="300px"
                onChange={(e) => setCategoryName(e)}
              />
              <TextError children={categoryNameError} />
            </div>
            <div
              className="my-3"
              ref={buttonRefAdd}
              style={{ display: "none" }}
            >
              <ButtonField
                loading={isloadingButton}
                children="Thêm"
                onClick={handleAddCategory}
              />
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="table-responsive">
                <table className="table align-middle mb-0 bg-white">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">TÊN THỂ LOẠI</th>
                      <th scope="col">NGÀY THÊM</th>
                      <th scope="col">THAO TÁC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listCategory.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.createDate}</td>
                        <td>
                          <ButtonField
                            children={<i className="fas fa-times"></i>}
                            onClick={() => {
                              if (item.id !== undefined) {
                                handleDeleteClick(item.id);
                              }
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AdminCategoryPage;
