import { Breadcrumbs, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from "../../components/common/TextField";
import ProvinceSelect from "../../components/user/ProvinceSelect";
import ButtonField from "../../components/common/ButtonField";
import { useNavigate } from "react-router-dom";
import TextError from "../../components/common/TextError";
import axios from "axios";
import { useAuth } from "../../hookCustom/AuthContext";
import SwalField from "../../components/common/SwalField";

const AddAddress: React.FC = () => {
  const { token, user } = useAuth();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [street, setStreet] = useState("");
  const [streetError, setStreetErrors] = useState("");
  const [province, setProvince] = useState("");
  const [provinceError, setProvinceError] = useState("");
  const [district, setDistrict] = useState("");
  const [districtError, setDistrictError] = useState("");
  const [ward, setWard] = useState("");
  const [wardError, setWardError] = useState("");
  const navigate = useNavigate();
  const handleAddAddress = async () => {
    if (user) {
      const isValid = await validation();
      if (isValid) {
        try {
          const response = await axios.post(
            `http://localhost:8080/api/address`,
            {
              name: name,
              phone: phone,
              street: street,
              ward: ward,
              district: district,
              city: province,
              user: {
                id: user?.id,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data) {
            SwalField({ icon: "success", title: "Thêm địa chỉ thành công" });
            navigate("/orderPage");
          } else {
            SwalField({ icon: "error", title: "Thêm địa chỉ thất bại" });
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      navigate("/loginAccount");
    }
  };
  const validation = () => {
    let isValid = true;
    if (name.trim() === "") {
      isValid = false;
      setNameError("Vui lòng nhập tên người nhận");
    } else {
      setNameError("");
    }
    if (phone.trim() === "") {
      isValid = false;
      setPhoneError("Vui lòng nhập số điện thoại người nhận");
    } else {
      setPhoneError("");
    }
    if (street.trim() === "") {
      isValid = false;
      setStreetErrors("Vui lòng nhập số nhà, tên đường...");
    } else {
      setStreetErrors("");
    }
    if (province === "") {
      isValid = false;
      setProvinceError("Vui lòng chọn tỉnh thành");
    } else {
      setProvinceError("");
    }
    if (district === "") {
      isValid = false;
      setDistrictError("Vui lòng chọn quận huyện");
    } else {
      setDistrictError("");
    }
    if (ward === "") {
      isValid = false;
      setWardError("Vui lòng chọn phường xã");
    } else {
      setWardError("");
    }
    return isValid;
  };
  const changeProvice = (value: string) => {
    setProvince(value);
  };
  const changeDistrict = (value: string) => {
    setDistrict(value);
  };
  const changeWard = (value: string) => {
    setWard(value);
  };
  return (
    <div className="min-vh-100 bg-light pt-4">
      <div className="row">
        <div className="breadcrumbs-container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Trang Chủ
            </Link>
            <Typography color="text.primary">Thêm Địa Chỉ Giao Hàng</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="row justify-content-center mx-5">
        <div className="col-md-6 px-5">
          <div className="mb-3">
            <label className="form-label">
              Tên Người Nhận <span className="text-danger fw-bold">*</span>
            </label>
            <TextField
              value={name}
              onChange={(e) => setName(e)}
              placeholder="Tên người nhận..."
            />
            <TextError children={nameError} />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Số Điện Thoại <span className="text-danger fw-bold">*</span>
            </label>
            <TextField
              value={phone}
              onChange={(e) => setPhone(e)}
              placeholder="Số điện thoại..."
            />
            <TextError children={phoneError} />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Số Nhà / Tên Đường <span className="text-danger fw-bold">*</span>
            </label>
            <TextField
              value={street}
              onChange={(e) => setStreet(e)}
              placeholder="Số nhà, tên đường..."
            />
            <TextError children={streetError} />
          </div>
          <ProvinceSelect
            onChangeProvince={changeProvice}
            onChangeDistrict={changeDistrict}
            onChangeWard={changeWard}
            provinceError={provinceError}
            districtError={districtError}
            wardError={wardError}
          />
          <ButtonField
            width="100%"
            children="Thêm Địa Chỉ"
            onClick={handleAddAddress}
          />
          <br />
          <ButtonField
            background="gray"
            children="Quay lại ?"
            onClick={() => navigate("/orderPage")}
          />
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
