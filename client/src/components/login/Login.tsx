import { ChangeEvent, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch } from "react-redux";
import { ActionType } from "../store/ActionType";
import jwt_decode from "jwt-decode";
import { ConnectContext } from "../socket/socket-container";

function LoginPage() {
  let navigate = useNavigate();
  let [userName, setUserName] = useState("");
  let [password, setPassword] = useState("");
  let dispatch = useDispatch();
  let connect = useContext(ConnectContext);

  function onUserNameChange(event: ChangeEvent<HTMLInputElement>) {
    let currentUserName = event.target.value;
    setUserName(currentUserName);
  }
  const onUserPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    let currentUserPassword = event.target.value;
    setPassword(currentUserPassword);
  };

  const onLoginClick = async () => {
    let loginData = { userName, password };

    try {
      const response = await axios.post(
        "http://localhost:3001/users/login",
        loginData
      );

      let serverResponse = response.data;
      let token = "Bearer " + serverResponse.token;
      axios.defaults.headers.common["Authorization"] = token;
      localStorage.setItem("token", token);
      connect(token);

      localStorage.setItem("auth", JSON.stringify(serverResponse.token));
      let decode: any = jwt_decode(serverResponse.token);

      const newUser = {
        id: decode.userId,
        fullName: serverResponse.lastName,
        userName: serverResponse.firstName,
        isAdmin: decode.userType === "Admin" ? true : false,
        isConnected: true,
      };

      dispatch({
        type: ActionType.addNewUser,
        payload: newUser,
      });

      if (decode.userType === "Admin") {
        navigate("/vacations");
      } else if (decode.userType === "Customer") {
        navigate("/vacations");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <input
          type="text"
          className="username-input"
          name="username"
          id="username"
          placeholder="username"
          onChange={onUserNameChange}
        />{" "}
        <br />
        <input
          type="password"
          className="password-input"
          name="password"
          id="password"
          placeholder="password"
          onChange={onUserPasswordChange}
        />{" "}
        <br />
        <button onClick={onLoginClick}>Login</button>
      </div>
    </div>
  );
}

export default LoginPage;
