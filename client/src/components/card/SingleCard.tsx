import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../store/ActionType";
import IVacation from "../models/IVacation";
import "./SingleCard.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import EditModal from "../modal/EditModal";

export interface IProps {
  vacation: IVacation;
}

function SingleCard(props: any) {
  const connectedUser = useSelector((state: any) => state.connectedUser);
  const [openEditModal, setOpenEditModal] = useState(false);
  let userId: number;
  let dispatch = useDispatch();
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
  const [likeButtonText, setLikeButtonText] = useState("Like");

  const removeVacation = async (id: number) => {
    alert("Are you sure you want to remove this vacation?");
    const { status } = await axios.delete(
      `http://localhost:3001/vacations/${props.vacation.id}`
    );
    if (status === 200) {
      dispatch({ type: ActionType.deleteVacation, payload: id });
    }
  };

  const onLikeClicked = async (vacationId: number, totalLike: number) => {
    setLikeButtonText("Liked!");
    let likedVacation = {
      vacationID: vacationId,
      userID: userId,
      totalLike,
    };

    try {
      const { status } = await axios.post(
        "http://localhost:3001/likedVacations",
        likedVacation
      );

      if (status === 200) {
        window.location.reload();
      }
    } catch (error) {
      alert(error);
    }
  };

  const onLikeRemoveClicked = async (vacationId: number, totalLike: number) => {
    setLikeButtonText("Like");
    const unlikedVacation = {
      vacationID: vacationId,
      userID: userId,
    };

    try {
      const { status } = await axios.delete(
        `http://localhost:3001/likedVacations/vacationId/${unlikedVacation.vacationID}/userId/${unlikedVacation.userID}/${totalLike}`
      );

      if (status === 200) {
        window.location.reload();
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      {openEditModal && (
        <div className="overlay">
          <div className="admin_popup_model_edit">
            <EditModal
              data={props.vacation}
              closeEditModal={setOpenEditModal}
            />
          </div>
        </div>
      )}

      <div className="single-card">
        <div className="img-container">
          <img
            src={props.vacation.imageUrl}
            className="img-responsive"
            alt=""
          />
        </div>
        <div className="description">
          <div>
            <p>Destination: {props.vacation.destination}</p>
          </div>
          <div>
            <p>Price: {props.vacation.price}$</p>
          </div>

          <div>
            <p>Start Date: {props.vacation.startDate}</p>
          </div>
          <div>
            <p>End Date: {props.vacation.endDate}</p>
          </div>
          <div>
            <span>
              {userType === "Customer" ? (
                props?.likedData
                  ?.filter(
                    (currentElement: any) => currentElement.user_id === userId
                  )
                  .filter((data: any) => data.vacation_id === props.vacation.id)
                  .length === 0 ? (
                  <>
                    <button
                      className="likeBtn"
                      onClick={() => {
                        onLikeClicked(
                          props.vacation.id,
                          props.vacation.amountOfFollowers
                        );
                      }}
                    >
                      Like
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="likeBtn"
                      onClick={() => {
                        onLikeRemoveClicked(
                          props.vacation.id,
                          props.vacation.amountOfFollowers
                        );
                      }}
                    >
                      Liked
                    </button>
                  </>
                )
              ) : null}
            </span>
          </div>
          <div className="remove-vacation">
            {userType === "Admin" ? (
              <button
                className="remove-vacation-btn"
                onClick={() => {
                  removeVacation(props.vacation.id);
                }}
              >
                Remove
              </button>
            ) : null}
            ;
          </div>
          <div className="edit-vacation">
            {userType === "Admin" ? (
              <button
                className="edit-vacation-btn"
                onClick={() => {
                  setOpenEditModal(true);
                }}
              >
                Edit
              </button>
            ) : null}{" "}
            ;
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleCard;
