import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="">
      <div className="container py-5">
        <div className="row py-3 text-center">
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="text-uppercase font-weight-bold mb-4">About</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Contact Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Stories
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Press
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="text-uppercase font-weight-bold mb-4">Help</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Payments
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Shipping
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Cancellation
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Returns
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="text-uppercase font-weight-bold mb-4">Policy</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Return Policy
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Terms Of Use
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Security
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="text-uppercase font-weight-bold mb-4">Company</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Login
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Register
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Sitemap
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Our Products
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 mb-lg-0">
            <h6 className="text-uppercase font-weight-bold mb-4">
              Registered Office Address
            </h6>
            <p className="text-muted mb-4">
              Here , write the complete address of the Registered office address
              along with telephone number.
            </p>
            <ul className="list-inline mt-4">
              <li className="list-inline-item">
                <a href="#" target="_blank" title="twitter">
                  <i className="fab fa fa-twitter text-danger"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" target="_blank" title="facebook">
                  <i className="fab fa fa-facebook-f text-danger"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" target="_blank" title="instagram">
                  <i className="fab fa fa-instagram text-danger"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" target="_blank" title="pinterest">
                  <i className="fab fa fa-youtube text-danger"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" target="_blank" title="vimeo">
                  <i className="fab fa fa-google text-danger"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-light py-2">
        <div className="container text-center">
          <p className="text-muted mb-0 py-2">
            &copy; 2019 BBBootstrap All risghts reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
