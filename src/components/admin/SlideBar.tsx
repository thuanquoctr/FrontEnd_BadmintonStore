import React from "react";
import { Link, Outlet } from "react-router-dom";

const SlideBar: React.FC = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-sm-auto sticky-top"
          style={{ background: "#563d7c" }}
        >
          <div className="d-flex flex-sm-column flex-row flex-nowrap align-items-center sticky-top">
            <Link
              to="/admin"
              className="d-block p-3 link-dark text-decoration-none"
              title="Doanh Thu"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Icon-only"
            >
              <i className="fa-solid fa-chart-line fs-2 text-white"></i>
            </Link>
            <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
              <li className="nav-item">
                <Link
                  to="/admin/managerOrder"
                  className="nav-link py-3 px-2"
                  title="Đơn Hàng"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  data-bs-original-title="Dashboard"
                >
                  <i className="bi bi-minecart-loaded fs-2 text-white"></i>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/admin/managerProduct"
                  className="nav-link py-3 px-2"
                  title="Sản Phẩm"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  data-bs-original-title="Dashboard"
                >
                  <i className="fa-brands fa-product-hunt fs-2 text-white"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/admin/managerCategory"
                  className="nav-link py-3 px-2"
                  title="Thể Loại"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  data-bs-original-title="Dashboard"
                >
                  <i className="fa-solid fa-layer-group fs-2 text-white"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/managerAccount"
                  className="nav-link py-3 px-2"
                  title="Người Dùng"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  data-bs-original-title="Orders"
                >
                  <i className="bi bi-people fs-2 text-white"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/managerComment"
                  className="nav-link py-3 px-2"
                  title="Đánh Giá Sản Phẩm"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  data-bs-original-title="Products"
                >
                  <i className="bi bi-chat-left-quote fs-2 text-white"></i>
                </Link>
              </li>
            </ul>
            {/* <div className="dropdown">
              <a
                href="#"
                title="Tài Khoản"
                className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle text-white"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi-person-circle h2 text-white"></i>
              </a>
              <ul
                className="dropdown-menu text-small shadow"
                aria-labelledby="dropdownUser3"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    New project...
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
        <div className="col-sm p-3 min-vh-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default SlideBar;
