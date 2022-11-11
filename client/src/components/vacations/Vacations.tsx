import axios from "axios";
import { useContext, useEffect, useState } from "react";
import IVacation from "../models/IVacation";
import SingleCard from "../card/SingleCard";
import "./vacation.css";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../store/ActionType";
import Dashboard from "../dashboard/dashboard";
import AppState from "../store/AppState";
import jwt_decode from "jwt-decode";

function Vacations() {
  let dispatch = useDispatch();
  let [vacations, setVacations] = useState<IVacation[]>([]);
  let storedVacations = useSelector((state: AppState) => state.vacations);
  let userId: number;

  const auth = localStorage.getItem("auth");
  let decode: any;
  if (auth) {
    decode = jwt_decode(JSON.parse(auth));
  }
  let userType;
  if (decode) {
    userType = decode.userType;
    userId = decode.userId;
  }
  const getVacations = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/vacations");

      let vacations: IVacation[] = data;
      setVacations(vacations);

      dispatch({ type: ActionType.showAllVacations, payload: vacations });
    } catch (e) {
      console.error(e);
      alert("Failed to retrieve vacations");
    }
  };
  useEffect(() => {
    getVacations();
  }, []);
  const [likedData, setlikedData] = useState<any>();
  const loadUsersAllLikedData = async (userId: number) => {
    const { data } = await axios.post(
      `http://localhost:3001/likedVacations/${userId}`
    );
    setlikedData(data);
  };
  useEffect(() => {
    loadUsersAllLikedData(userId);
  }, []);

  return (
    <div className="vacations-wrapper">
      <div className="vacations-container">
        <div className="dashboard-div" id="dashboard_div">
          <Dashboard />
        </div>
        <div className="vacations">
          <div className="dashboard_menu">
            <button id="dashboard_menu">Menu</button>
          </div>
          <div className="vacation-cards">
            {storedVacations.map((vacation) => (
              <SingleCard
                key={vacation.id}
                vacation={vacation}
                likedData={likedData}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Vacations;
