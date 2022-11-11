import { useNavigate } from "react-router-dom";
import "./logout.css";
import { useDispatch } from "react-redux";
import { ActionType } from "../store/ActionType";

function LogoutPage() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const navigateToVacationsPage = () => {
    navigate("/vacations");
  };

  const onLogoutClick = () => {
    debugger;
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    dispatch({ type: ActionType.removeConnectedUser });
    navigateToVacationsPage();
  };

  return (
    <div className="logout-wrapper">
      <div className="logout-container">
        <div className="logout">
          <span className="logout-title">
            Oh,no! You're leaving...
            <br /> Are you sure?
          </span>
        </div>
        <div className="logout-buttons">
          <button onClick={navigateToVacationsPage}>Cancel</button>
          <button onClick={onLogoutClick}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;
