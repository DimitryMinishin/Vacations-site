import React, { useState } from "react";
import Modal from "../modal/modal";
import { useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const [openModal, setopenModal] = useState(false);
  let navigate = useNavigate();
  const navigateToLoginPage = () => {
    navigate("/login");
  };
  const navigateToLogoutPage = () => {
    navigate("/logout");
  };

  return (
    <div className="header">
      <div className="logo">
        <img
          src="https://i.ibb.co/fScn9sp/LOGO.jpg"
          alt="LOGO"
          className="logo-img"
        />
        <h2>Dream Vacations</h2>
      </div>
      <div className="header_nav" id="header_nv">
        <div className="navbuttons">
          <div className="signIn-div">
            <button className="signInBtn" onClick={navigateToLoginPage}>
              LOG IN
            </button>
          </div>
          <div className="signUp-div">
            <button
              className="signUpBtn"
              onClick={() => {
                setopenModal(true);
              }}
            >
              SIGN UP
            </button>
            {openModal && <Modal closeModal={setopenModal} />}
          </div>
          <div className="signIn-div">
            <button className="logOutBtn" onClick={navigateToLogoutPage}>
              LOG OUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
