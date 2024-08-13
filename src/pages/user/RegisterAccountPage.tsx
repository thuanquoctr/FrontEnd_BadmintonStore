import React, { useState } from "react";
import TextField from "../../components/common/TextField";
import ButtonField from "../../components/common/ButtonField";
import axios from "axios";
import TextError from "../../components/common/TextError";
import SwalField from "../../components/common/SwalField";
import { Link, useNavigate } from "react-router-dom";

const RegisterAccountPage: React.FC = () => {
  const [firstname, setFirstname] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastname, setLastname] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordconfirm, setPasswordconfirm] = useState("");
  const [passwordconfirmError, setPasswordconfirmError] = useState("");
  const navigate = useNavigate();
  const handleRegisterAccount = async () => {
    try {
      const checkIsvalid = await validation();
      if (!checkIsvalid) {
        return;
      }
      const existsEmail = await axios.get(
        `http://localhost:8080/api/users/existsByEmail`,
        {
          params: {
            email: email,
          },
        }
      );
      if (existsEmail.data === true) {
        setEmailError("Email đã được đăng kí trước đó");
        return;
      } else {
        setEmailError("");
      }

      const existsPhone = await axios.get(
        `http://localhost:8080/api/users/existsByPhone`,
        {
          params: {
            phone: phone,
          },
        }
      );
      if (existsPhone.data === true) {
        setPhoneError("Số điện thoại đã được đăng kí trước đó");
        return;
      } else {
        setPhoneError("");
      }

      const existsUsername = await axios.get(
        `http://localhost:8080/api/users/existsByUsername`,
        {
          params: {
            username: username,
          },
        }
      );
      if (existsUsername.data === true) {
        setUsernameError("Tên đăng nhập đã tồn tại ");
        return;
      } else {
        setUsernameError("");
      }
      const addAccount = await axios.post(`http://localhost:8080/api/users`, {
        firstName: firstname,
        lastName: lastname,
        username: username,
        password: password,
        email: email,
        phone: phone,
      });
      if (addAccount.data) {
        SwalField({
          title: "Tạo tài khoản thành công",
          icon: "success",
        });
        navigate("/loginAccount");
      } else {
        SwalField({
          title: "Tạo tài khoản thất bại",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  function validation() {
    let isValid = true;
    if (firstname.trim() == "") {
      setFirstnameError("Vui lòng nhập tên");
      isValid = false;
    } else {
      setFirstnameError("");
    }
    if (lastname.trim() == "") {
      setLastnameError("Vui lòng nhập họ");
      isValid = false;
    } else {
      setLastnameError("");
    }
    if (email.trim() == "") {
      setEmailError("Vui lòng nhập Email");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (phone.trim() == "") {
      setPhoneError("Vui lòng nhập số điện thoại");
      isValid = false;
    } else {
      setPhoneError("");
    }
    if (username.trim() == "") {
      setUsernameError("Vui lòng nhập tên đăng nhập");
      isValid = false;
    } else {
      setUsernameError("");
    }
    if (password.trim() == "") {
      setPasswordError("Vui lòng nhập mật khẩu");
      isValid = false;
    } else {
      setPasswordError("");
    }
    if (passwordconfirm.trim() == "") {
      setPasswordconfirmError("Vui lòng nhập lại mật khẩu");
      isValid = false;
    } else {
      setPasswordconfirmError("");
    }

    if (password.trim() !== passwordconfirm.trim()) {
      setPasswordconfirmError("Không khớp mật khẩu");
      isValid = false;
    } else {
      setPasswordconfirmError("");
    }

    return isValid;
  }
  return (
    <div className="container">
      <div className="row py-5 align-items-center">
        <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
          <img
            src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg"
            alt=""
            className="img-fluid mb-3 d-none d-md-block"
          />
        </div>

        <div className="col-md-7 col-lg-6 ml-auto">
          <div className="row">
            <div className="input-group col-lg-6 mb-4">
              <div className="input-group-prepend">
                <span
                  style={{ height: "51px" }}
                  className="input-group-text bg-white px-4 border-md border-right-0"
                >
                  <i className="fa fa-user text-muted"></i>
                </span>
              </div>
              <TextField
                height="50px"
                value={firstname}
                placeholder="Tên..."
                onChange={(e) => setFirstname(e)}
              />
              <div style={{ width: "100%" }}>
                <TextError children={firstnameError} />
              </div>
            </div>
            <div className="input-group col-lg-6 mb-4">
              <div className="input-group-prepend">
                <span
                  style={{ height: "51px" }}
                  className="input-group-text bg-white px-4 border-md border-right-0"
                >
                  <i className="fa fa-user text-muted"></i>
                </span>
              </div>
              <TextField
                height="50px"
                value={lastname}
                placeholder="Họ..."
                onChange={(e) => setLastname(e)}
              />
              <div style={{ width: "100%" }}>
                <TextError children={lastnameError} />
              </div>
            </div>
            <div className="input-group col-lg-12 mb-2">
              <div className="input-group-prepend">
                <span className="input-group-text bg-white px-4 border-md border-right-0">
                  <i className="fa fa-envelope text-muted"></i>
                </span>
              </div>
              <TextField
                value={email}
                type="email"
                placeholder="Email..."
                onChange={(e) => setEmail(e)}
              />
              <div style={{ width: "100%" }}>
                <TextError children={emailError} />
              </div>
            </div>
            <div className="input-group col-lg-12 mb-2">
              <div className="input-group-prepend">
                <span className="input-group-text bg-white px-4 border-md border-right-0">
                  <i className="fa fa-phone-square text-muted"></i>
                </span>
              </div>
              <TextField
                value={phone}
                type="tel"
                placeholder="Số điện thoại..."
                onChange={(e) => setPhone(e)}
              />
              <div style={{ width: "100%" }}>
                <TextError children={phoneError} />
              </div>
            </div>
            <div className="input-group col-lg-12 mb-2">
              <div className="input-group-prepend">
                <span className="input-group-text bg-white px-4 border-md border-right-0">
                  <i className="fa-solid fa-user text-muted"></i>
                </span>
              </div>
              <TextField
                value={username}
                type="text"
                placeholder="Tên đăng nhập..."
                onChange={(e) => setUsername(e)}
              />

              <div style={{ width: "100%" }}>
                <TextError children={usernameError} />
              </div>
            </div>

            <div className="input-group col-lg-6 mb-2">
              <div className="input-group-prepend">
                <span
                  style={{ height: "51px" }}
                  className="input-group-text bg-white px-4 border-md border-right-0"
                >
                  <i className="fa fa-lock text-muted"></i>
                </span>
              </div>
              <TextField
                height="50px"
                value={password}
                type="password"
                placeholder="Mật khẩu..."
                onChange={(e) => setPassword(e)}
              />
              <div style={{ width: "100%" }}>
                <TextError children={passwordError} />
              </div>
            </div>
            <div className="input-group col-lg-6 mb-2">
              <div className="input-group-prepend">
                <span
                  style={{ height: "51px" }}
                  className="input-group-text bg-white px-4 border-md border-right-0"
                >
                  <i className="fa fa-lock text-muted"></i>
                </span>
              </div>
              <TextField
                height="50px"
                value={passwordconfirm}
                type="password"
                placeholder="Nhập lại mật khẩu..."
                onChange={(e) => setPasswordconfirm(e)}
              />
              <div style={{ width: "100%" }}>
                <TextError children={passwordconfirmError} />
              </div>
            </div>
            <div className="form-group col-lg-12 mx-auto mb-0">
              <ButtonField
                children="Tạo tài khoản của bạn"
                width="100%"
                onClick={handleRegisterAccount}
              />
            </div>
            <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
              <div className="border-bottom w-100 ml-5"></div>
              <span className="px-2 small text-muted font-weight-bold text-muted">
                Hoặc
              </span>
              <div className="border-bottom w-100 mr-5"></div>
            </div>
            <div className="form-group col-lg-12 mx-auto">
              <ButtonField
                background="#4267B2"
                children="Tiếp tục với Facebook"
                width="100%"
              />
              <ButtonField
                background="gray"
                children="Tiếp tục với Google"
                width="100%"
              />
            </div>
            <div className="text-center w-100">
              <p className="text-muted font-weight-bold">
                Đã có tài khoản?{" "}
                <Link
                  to="/loginAccount"
                  style={{ textDecoration: "none" }}
                  className="text-primary ml-2"
                >
                  Đăng Nhập
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterAccountPage;
