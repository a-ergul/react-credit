import React from "react";
import payment from "../../assets/images/payment.gif";
import bank from "../../assets/images/bank.gif";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-container-box">
        <img src={payment} width={70} height={70} />
        <h2 style={{ paddingLeft: 20, color: "white" }}>
          Kredi Tutarı Hesaplama
        </h2>
        <div className="header-container-icon">
            <img
            src={bank}
            className="header-icon"
            />
        </div>
      </div>
    </div>
  );
};

export default Header;
