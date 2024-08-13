import React from "react";
import imgslider from "../assets/slider.png";

const Slider: React.FC = () => {
  return (
    <div
      id="myCarousel"
      className="carousel slide carousel-fade"
      data-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="mask flex-center">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-7 col-12 order-md-1 order-2">
                  <h4>Giới thiệu sản phẩm tuyệt vời về : Thiết bị cầu lông</h4>
                  <p>
                    Nâng cao trò chơi của bạn với thiết bị cầu lông hàng đầu của
                    chúng tôi. Từ vợt đến cầu lông, chúng tôi có mọi thứ bạn cần
                    để bạn xuất sắc trên sân. Trải nghiệm chất lượng và hiệu
                    suất chưa từng có.
                  </p>
                  <a href="#">Mua Ngay</a>{" "}
                </div>
                <div className="col-md-5 col-12 order-md-2 order-1">
                  <video src=""></video>
                  <img
                    className="mx-auto"
                    style={{ width: "50%" }}
                    src={imgslider}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Slider;
