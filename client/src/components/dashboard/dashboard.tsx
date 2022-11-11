import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddVacation from "../modal/AddVacation";
import GraphPreview from "../modal/GraphPreviw";
import IVacation from "../models/IVacation";
import { ActionType } from "../store/ActionType";
import jwt_decode from "jwt-decode";

function Dashboard() {
  const vacations = useSelector((state: any) => state.vacations);
  const user = useSelector((state: any) => state.connectedUser);
  const connectedUser = useSelector((state: any) => state.connectedUser);
  const auth = localStorage.getItem("auth");
  const dispatch = useDispatch();
  let decode: any;
  if (auth) {
    decode = jwt_decode(JSON.parse(auth));
  }
  let userType;
  if (decode) {
    userType = decode.userType;
  }

  useEffect(() => {
    dispatch({ type: "showAllVacations", payload: vacations });
  }, []);

  const searchByPrice = (event: ChangeEvent<HTMLInputElement>) => {
    let price = event.target.value;
    let searchedVacations = filterByPrice(vacations, +price);
    if (searchedVacations.length > 0) {
      dispatch({
        type: ActionType.showAllVacations,
        payload: searchedVacations,
      });
      event.target.value = "";
    } else {
      dispatch({ type: ActionType.showAllVacations, payload: vacations });
    }
  };

  const searchByDestination = (event: ChangeEvent<HTMLInputElement>) => {
    let destination = "";
    destination = event.target.value;
    let searchedVacations = filterByDestination(vacations, destination);
    if (searchedVacations.length > 0) {
      dispatch({
        type: ActionType.showAllVacations,
        payload: searchedVacations,
      });
      event.target.value = "";
    } else {
      dispatch({ type: ActionType.showAllVacations, payload: vacations });
    }
  };

  function filterByPrice(vacations: any, price: number) {
    let filteredVacations = vacations.filter((vacation: any) => {
      if (vacation.price <= price) {
        return vacation;
      }
    });
    return filteredVacations;
  }

  //reset all filters
  const resetAllFilters = () => {
    axios
      .get("http://localhost:3001/vacations")
      .then((response) => {
        let vacations: IVacation[] = response.data;

        dispatch({ type: ActionType.showAllVacations, payload: vacations });
      })
      .catch((e) => {
        console.error(e);
        alert("Failed to retrieve vacations");
      });
    dispatch({ type: ActionType.showAllVacations, payload: vacations });
  };

  function filterByDestination(vacations: any, destination: string) {
    let filteredLocations = vacations.filter((vacation: any) => {
      if (vacation.destination === destination) {
        return vacation;
      }
    });
    return filteredLocations;
  }
  const [open, setOpen] = useState(false);
  const [addmodel, setAddModal] = useState(false);
  return (
    <>
      {addmodel && (
        <div className="overlay">
          <div className="admin_popup_model_edit">
            <AddVacation setAddModal={setAddModal} />
          </div>
        </div>
      )}
      <div className="dashboard-container">
        <GraphPreview open={open} setOpen={setOpen} />
        <div className="dashboard-title">
          <h3>
            Hello, <i>{connectedUser.userName}</i> <br />
            <br />
            Welcome to vacations site!
          </h3>
        </div>
        <div className="price-filter-div">
          <label htmlFor="maxPrice">Filter By Price</label>
          <input
            type="number"
            placeholder="Max price"
            name="maxPrice"
            onChange={searchByPrice}
          />
        </div>
        <div className="destination-filter-div">
          <label htmlFor="destination">Filter By Destination</label>
          <input
            type="text"
            placeholder="Destination"
            name="destination"
            onChange={searchByDestination}
          />
        </div>
        <div className="reset-div">
          <button onClick={resetAllFilters}>Reset all filters</button>
        </div>
        <div className="admin-buttons">
          {userType === "Admin" ? (
            <button onClick={() => setAddModal(true)}>Add Vacation</button>
          ) : null}
          {userType === "Admin" ? (
            <button onClick={() => setOpen(true)}>Graph Preview</button>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
