import React, { useEffect, useState } from "react";
import TextField from "../../components/common/TextField";
import ButtonField from "../../components/common/ButtonField";
import TextareaField from "../../components/common/TextareaField";
import NumberField from "../../components/common/NumberField";
import ComboboxField from "../../components/common/ComboboxField";
import Category from "../../models/Category.model";
import axios from "axios";
import SpinnerLoading from "../../components/common/SpinnerLoading";
import TextError from "../../components/common/TextError";
import SwalField from "../../components/common/SwalField";
import { useAuth } from "../../hookCustom/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminAddProductPage: React.FC = () => {
  const [isLoading, setIsloading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [title, setTitle] = useState("");
  const [titlError, setTitleError] = useState("");
  const [pictureMain, setPictureMain] = useState<File | null>(null);
  const [pictureMainError, setPictureMainError] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [priceError, setPriceError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [quantity, setQuantity] = useState<number | undefined>(undefined);
  const [quantityError, setQuantityError] = useState("");
  const [brand, setBrand] = useState("");
  const [brandError, setBrandError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [listCategory, setlistCategory] = useState<Category[]>([]);
  const { user, token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const getAllCategory = async () => {
      setIsloading(true);
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
          setlistCategory(response.data);
          setIsloading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategory();
  }, []);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("0");
  const handleCategoryChange = (selectedCategoryId: string) => {
    setSelectedCategoryId(selectedCategoryId);
  };

  const handleAddProduct = async () => {
    if (user) {
      try {
        const isValid = await validation();
        if (!isValid) {
          return;
        }
        setLoadingButton(true);
        const response = await axios.post(
          `http://localhost:8080/api/products/${selectedCategoryId}/add`,
          {
            title: title,
            brand: brand,
            description: description,
            price: price,
            quantity: quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTimeout(() => {
          if (pictureMain !== null) {
            uploadImage(response.data.id, pictureMain);
          }
          reset();
          SwalField({
            title: "Thêm sản phẩm thành công",
            icon: "success",
          });
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/loginAccount");
    }
  };
  function reset() {
    setLoadingButton(false);
    setTitle("");
    setPrice(undefined);
    setQuantity(undefined);
    setBrand("");
    setDescription("");
    setPictureMain(null);
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPictureMain(event.target.files[0]);
    }
  };
  const uploadImage = async (productId: number, image: File) => {
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/products/image/upload/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };
  function validation() {
    let isValid = true;

    if (title.trim() === "") {
      setTitleError("Vui lòng điền tên sản phẩm");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (selectedCategoryId === "0") {
      setCategoryError("Vui lòng chọn loại sản phẩm");
      isValid = false;
    } else {
      setCategoryError("");
    }

    if (pictureMain === null) {
      setPictureMainError("Vui lòng chọn ảnh sản phẩm");
      isValid = false;
    } else {
      setPictureMainError("");
    }

    if (price === undefined) {
      setPriceError("Vui lòng điền giá sản phẩm");
      isValid = false;
    } else if (price < 0) {
      setPriceError("Giá không hợp lệ");
      isValid = false;
    } else {
      setPriceError("");
    }

    if (quantity === undefined) {
      setQuantityError("Vui lòng điền số lượng sản phẩm");
      isValid = false;
    } else if (quantity < 0) {
      setQuantityError("Số lượng phải ít nhất bằng 1");
      isValid = false;
    } else {
      setQuantityError("");
    }

    if (brand.trim() === "") {
      setBrandError("Vui lòng điền hãng sản phẩm");
      isValid = false;
    } else {
      setBrandError("");
    }

    if (description.trim() === "") {
      setDescriptionError("Vui lòng điền mô tả sản phẩm");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    return isValid;
  }

  return (
    <>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <div className="px-3">
          <div className="row">
            <div>
              <h3 className="mt-4">THÊM SẢN PHẨM MỚI</h3>
            </div>
          </div>
          <hr style={{ borderTop: "4px solid black" }} />{" "}
          <div className="row">
            <form className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Tên Sản Phẩm <span className="text-danger fw-bold">*</span>
                  </label>
                  <TextField
                    placeholder="Tên sản phẩm..."
                    value={title}
                    onChange={(e) => setTitle(e)}
                  />
                  <TextError children={titlError} />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Loại Sản Phẩm <span className="text-danger fw-bold">*</span>
                  </label>
                  <ComboboxField
                    categorys={listCategory}
                    onCategoryChange={handleCategoryChange}
                  />
                  <TextError children={categoryError} />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Ảnh Đại Diện <span className="text-danger fw-bold">*</span>
                  </label>
                  <br />
                  <input
                    className="form-control"
                    accept="images/*"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <TextError children={pictureMainError} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Giá Sản Phẩm <span className="text-danger fw-bold">*</span>
                  </label>
                  <NumberField
                    placeholder="Giá sản phẩm..."
                    value={price}
                    onChange={(e) => setPrice(e)}
                  />
                  <TextError children={priceError} />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Số Lượng <span className="text-danger fw-bold">*</span>
                  </label>
                  <NumberField
                    placeholder="Số lượng..."
                    value={quantity}
                    onChange={(e) => setQuantity(e)}
                  />
                  <TextError children={quantityError} />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Hãng Sản Xuất <span className="text-danger fw-bold">*</span>
                  </label>
                  <TextField
                    placeholder="Hãng sản xuất..."
                    value={brand}
                    onChange={(e) => setBrand(e)}
                  />
                  <TextError children={brandError} />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">
                    Mô Tả Sản Phẩm{" "}
                    <span className="text-danger fw-bold">*</span>
                  </label>
                  <TextareaField
                    placeholder="Mô tả sản phẩm..."
                    value={description}
                    onChange={(e) => setDescription(e)}
                  />
                  <TextError children={descriptionError} />
                </div>
              </div>
            </form>
          </div>
          <div className="row">
            <div className="text-center">
              <ButtonField
                width="200px"
                onClick={handleAddProduct}
                loading={loadingButton}
                children="Thêm Sản Phẩm"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminAddProductPage;
