import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import IUser from "../models/IUser";
import "./modal.css";

function Modal(props: any) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onChangeFirstName = (event: ChangeEvent<HTMLInputElement>): void => {
    let firstName = event.target.value;
    firstName.trim();
    console.log(firstName);
    setFirstName(firstName);
  };

  const onChangeLastName = (event: ChangeEvent<HTMLInputElement>): void => {
    let lastName = event.target.value;
    lastName.trim();
    console.log(lastName);
    setLastName(lastName);
  };

  const onChangeUserName = (event: ChangeEvent<HTMLInputElement>): void => {
    let userName = event.target.value;
    userName.trim();
    console.log(userName);
    setUserName(userName);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    let pass = event.target.value;
    pass.trim();
    console.log(pass);
    setPassword(pass);
  };

  // validate user name
  const validateUser = () => {
    if (lastName.length < 2 || lastName == "" || lastName == null) {
      alert("Please enter a valid Last name");
      return false;
    }
    if (firstName.length < 2 || firstName == "" || firstName == null) {
      alert("Please enter a valid First name");
      return false;
    }
    if (password.length < 6 || password == "" || password == null) {
      alert("Please enter a valid password");
      return false;
    }
    return true;
  };

  const onSignUpClicked = async () => {
    if (validateUser()) {
      const user: IUser = {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        password: password,
      };
      try {
        const { status } = await axios.post(
          "http://localhost:3001/users/",
          user
        );

        if (status === 200) {
          navigate("/login");
        }
      } catch (error) {
        alert(error);
      }
    }
    closeModalFunction();
  };

  const closeModalFunction = () => {
    props.closeModal(false);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button
          className="titleCloseBtn"
          onClick={() => props.closeModal(false)}
        >
          {" "}
          X{" "}
        </button>
        <div className="title">
          <h4>Sign Up</h4>
        </div>
        <div className="body">
          <div className="usernameDiv">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              className="username"
              placeholder="Username"
              onChange={onChangeUserName}
            />
          </div>
          <div className="passwordDiv">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              className="password"
              placeholder="Password"
              onChange={onChangePassword}
            />
          </div>
          <div className="first-name">
            <label htmlFor="first-name">First Name: </label>
            <input
              type="text"
              className="first-name"
              placeholder="First Name"
              onChange={onChangeFirstName}
            />
          </div>
          <div className="last-name">
            <label htmlFor="last-name">Last Name: </label>
            <input
              type="text"
              className="last-name"
              placeholder="Last Name"
              onChange={onChangeLastName}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="cancelBtn" onClick={closeModalFunction}>
            Cancel
          </button>
          <button className="signBtn" onClick={onSignUpClicked}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
