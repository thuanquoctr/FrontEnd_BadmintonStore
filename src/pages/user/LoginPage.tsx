import React, { useState } from "react";
import TextField from "../../components/common/TextField";
import ButtonField from "../../components/common/ButtonField";
import { FaKey, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import TextError from "../../components/common/TextError";
import axios from "axios";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../hookCustom/AuthContext";
const clientId =
  "773758157796-c4mecs1fnkb301c0u0gqf960tsfsc0ld.apps.googleusercontent.com";
const baseCode = "LKN6J35JB4BJ8BJ52JB4JVJ7B5B4J6B4J6B4J";
const LoginPage: React.FC = () => {
  const { user, logout } = useAuth();
  if (user) {
    logout();
  }
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginFall, setLoginFall] = useState("");
  const { login } = useAuth();
  const handleLogin = async () => {
    try {
      const checkIsValid = await checknull();
      if (!checkIsValid) {
        return;
      }
      const loginStatus = await login(username, password);
      if (loginStatus === true) {
        setLoginFall("");
        navigate("/");
      } else {
        setLoginFall("Sai thông tin đăng nhập");
      }
    } catch (error) {
      setLoginFall("Sai thông tin đăng nhập");
    }
  };

  const checknull = () => {
    let isValid = true;
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
    return isValid;
  };
  const onSuccess = async (response: any) => {
    try {
      const token = await response.credential;
      const decoded: any = await jwtDecode(token);
      const email = await decoded.email;
      const name = await decoded.name;
      const picture = await decoded.picture;
      const nameParts = await name.split(" ");
      const firstName = await nameParts[0];
      const lastName = await nameParts.slice(1).join(" ");
      const existsEmail = await axios.get(
        `http://localhost:8080/api/users/existsByEmail`,
        {
          params: {
            email: email,
          },
        }
      );
      if (existsEmail.data === true) {
        console.log("roi");
        return;
      } else {
        const registerAccount = await axios.post(
          `http://localhost:8080/api/users`,
          {
            firstName: firstName,
            lastName: lastName,
            username: email,
            password: email + baseCode,
            email: email,
          }
        );
        const loginAccount = await axios.post(
          `http://localhost:8080/api/users/loginAccount`,
          { username: email, password: email + baseCode }
        );
        if (loginAccount.data) {
          const { token } = loginAccount.data;
          localStorage.setItem("user", token);
          navigate("/");
        } else {
          navigate("/loginAccount");
        }
      }
    } catch (error) {
      // console.log(error);
    }

    // navigate("/");
  };

  const onError = () => {
    console.log("Login Failed");
  };
  return (
    <div className="row justify-content-center my-5 m-0">
      <div className="col-md-4 col-sm-6">
        <div className="row">
          <h4 className="text-center">ĐĂNG NHẬP</h4>
          <div className="mb-3">
            <div className="input-group">
              <div className="input-group-prepend">
                <span
                  style={{ height: "51px" }}
                  className="input-group-text bg-white px-4 border-md border-right-0"
                >
                  <FaUser className="text-muted" />
                </span>
              </div>
              <TextField
                value={username}
                onChange={(e) => setUsername(e)}
                placeholder="Tên đăng nhập.."
                type="text"
              />
              <div style={{ width: "100%" }}>
                <TextError children={usernameError} />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div className="input-group">
              <div className="input-group-prepend">
                <span
                  style={{ height: "51px" }}
                  className="input-group-text bg-white px-4 border-md border-right-0"
                >
                  <FaKey className="text-muted" />
                </span>
              </div>
              <TextField
                value={password}
                onChange={(e) => setPassword(e)}
                placeholder="Mật khẩu.."
                type="password"
              />
              <div style={{ width: "100%" }}>
                {" "}
                <TextError children={passwordError} />
                <TextError children={loginFall} />
              </div>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col text-start ms-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label">Lưu thông tin ?</label>
          </div>
          <div className="col text-end">
            <ButtonField onClick={handleLogin} children="Đăng Nhập" />
          </div>
        </div>
        <div className="row">
          <div className="col text-start">
            <Link to="/registerAccount" style={{ textDecoration: "none" }}>
              Tạo tài khoản
            </Link>
          </div>
          <div className="col text-end">
            <Link to="" style={{ textDecoration: "none" }}>
              Quên mật khẩu
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
            <div className="border-bottom w-100 ml-5"></div>
            <span className="px-2 small text-muted font-weight-bold text-muted">
              Hoặc
            </span>
            <div className="border-bottom w-100 mr-5"></div>
          </div>
          <div className="form-group col-lg-6">
            <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin
                size="large"
                onSuccess={onSuccess}
                onError={onError}
              />
            </GoogleOAuthProvider>
            {/* <ButtonField
              background="gray"
              children="Tiếp tục với Google"
              width="100%"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
