import React, { useEffect, useState } from "react";
import { BsMinecartLoaded } from "react-icons/bs";
import logomain from "../assets/badminton.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hookCustom/AuthContext";
import { FaHeart } from "react-icons/fa";
const Header: React.FC = () => {
  const { getCountCart } = useAuth();
  const { user, logout, token } = useAuth();
  const [countCart, setCountCart] = useState<number>(0);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/loginAccount");
  };
  useEffect(() => {
    const fetchCartCount = async () => {
      if (user && user.id !== undefined) {
        const count = await getCountCart(user.id);
        setCountCart(count);
      }
    };
    fetchCartCount();
  });
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link to="/" className="navbar-brand">
        <img src={logomain} alt="logo" style={{ width: "70px" }} />
      </Link>
      <button
        type="button"
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        id="navbarCollapse"
        className="collapse navbar-collapse justify-content-start"
      >
        <div className="navbar-nav">
          <Link to="/" className="nav-item nav-link active">
            Home
          </Link>
          <a href="#" className="nav-item nav-link">
            About
          </a>
          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-item nav-link dropdown-toggle"
              data-toggle="dropdown"
            >
              Categories
            </a>
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item">
                Web Design
              </a>
              <a href="#" className="dropdown-item">
                Web Development
              </a>
              <a href="#" className="dropdown-item">
                Graphic Design
              </a>
              <a href="#" className="dropdown-item">
                Digital Marketing
              </a>
            </div>
          </div>
          <a href="#" className="nav-item nav-link">
            Blog
          </a>
        </div>
        <div className="navbar-nav ml-auto">
          <div className="navbar-form-wrapper">
            <form className="navbar-form form-inline">
              <div className="input-group search-box">
                <input
                  type="text"
                  id="search"
                  className="form-control"
                  placeholder="Search..."
                />
                <div className="input-group-append">
                  <span
                    className="input-group-text"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="material-icons">&#xE8B6;</i>
                  </span>
                </div>
              </div>
            </form>
          </div>

          {user ? (
            <>
              <Link
                title="Sản Phẩm Yêu Thích"
                to="/heartPage"
                className="nav-item nav-link"
              >
                <FaHeart fontSize={22} />
              </Link>
              <Link
                title="Giỏ Hàng"
                to="/cartPage"
                className="nav-item nav-link"
              >
                <BsMinecartLoaded fontSize={22} />
                {countCart !== 0 && (
                  <span
                    style={{ background: "#eb5844" }}
                    className="position-absolute top-10 start-10 translate-middle badge rounded-pill"
                  >
                    {countCart}
                  </span>
                )}
              </Link>
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-item nav-link dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Hey, {user.firstName}
                </a>
                <div className="dropdown-menu">
                  <a style={{ cursor: "pointer" }} className="dropdown-item">
                    Hồ Sơ
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/historyOrder")}
                    className="dropdown-item"
                  >
                    Đơn Hàng
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={handleLogout}
                    className="dropdown-item"
                  >
                    Đăng Xuất
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-item nav-link dropdown-toggle"
                data-toggle="dropdown"
              >
                Tài Khoản
              </a>
              <div className="dropdown-menu">
                <Link to="/loginAccount" className="dropdown-item">
                  Đăng Nhập
                </Link>
                <Link to="/registerAccount" className="dropdown-item">
                  Đăng Ký
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Header;
