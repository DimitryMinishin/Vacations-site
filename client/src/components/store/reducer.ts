import AppState from "./AppState";
import { AnyAction } from "redux";
import { ActionType } from "./ActionType";

export default function reducer(
  oldState: AppState | undefined,
  action: AnyAction
): AppState {
  if (!oldState) {
    return new AppState();
  }

  const newState = { ...oldState };

  switch (action.type) {
    case ActionType.addNewUser:
      console.log(newState.connectedUser);

      newState.connectedUser = action.payload;
      break;

    case ActionType.showAllVacations:
      newState.vacations = action.payload;
      break;

    case ActionType.filterVacations:
      newState.vacations = action.payload;
      console.log(newState.vacations);
      break;

    case ActionType.removeConnectedUser:
      newState.connectedUser = {
        id: -1,
        fullName: "",
        username: "",
        isAdmin: false,
        isConnected: false,
      };
      break;

    case ActionType.deleteVacation:
      newState.vacations = newState.vacations.filter((vacation) => {
        return vacation.id !== action.payload;
      });
      break;

    case ActionType.addVacation:
      newState.vacations = newState.vacations.concat(action.payload);
      break;

    case ActionType.editVacation:
      newState.vacations = newState.vacations.map((vacation) => {
        if (vacation.id === action.payload.id) {
          return action.payload;
        }
        return vacation;
      });
      break;

    case ActionType.addLikeVacationToCurrentUser:
      if (
        !newState.currentUserLikedVacations.find(
          (vacation) => vacation.vacationID === action.payload.id
        )
      ) {
        newState.currentUserLikedVacations =
          newState.currentUserLikedVacations.concat(action.payload);
      }
      break;

    case ActionType.removeUnlikeVacationFromCurrentUser:
      newState.currentUserLikedVacations =
        newState.currentUserLikedVacations.filter(
          (vacation) => vacation.vacationID !== action.payload.id
        );
      break;
  }
  return newState;
}
