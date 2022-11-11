import ILike from "../models/ILikeVacation";
import IVacation from "../models/IVacation";

export default class AppState {
  public connectedUser: object = {
    id: -1,
    fullName: "",
    username: "",
    isAdmin: false,
    isConnected: false,
  };
  public vacations: IVacation[] = [];
  public currentUserLikedVacations: ILike[] = [];
}
