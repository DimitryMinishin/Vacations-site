const connection = require("./connection-wrapper");

// get all vacations
async function getAllLikedVacations(userId) {
  console.log(userId);
  let sql = "select *  from liked_vacations ";
  // let parameters = [userId];
  return await connection.execute(sql);
}

//add vacation to liked vacations
async function addVacationToLikedVacations(likedVacation) {
  let sql =
    `insert into liked_vacations(vacation_id, user_id) ` + `values(?, ?)`;
  let parameters = [likedVacation.vacationID, likedVacation.userID];
  if (await connection.executeWithParameters(sql, parameters)) {
    return true;
  }
  throw new Error("Failed to add vacation to liked vacations");
}

//delete liked vacation from liked vacations
async function deleteVacationFromLikedVacations(unlikedVacation) {
  let sql = `delete from liked_vacations where vacation_id = ? and user_id = ?`;
  let parameters = [unlikedVacation.vacationID, unlikedVacation.userID];
  if (await connection.executeWithParameters(sql, parameters)) {
    return true;
  }
  throw new Error("Failed to delete vacation from liked vacations");
}

//check if vacation is in liked vacations
async function isVacationInLikedVacations(vacationID) {
  let sql = `select id from liked_vacations where vacation_id = ?`;
  let parameters = [vacationID];
  let [vacation] = await connection.executeWithParameters(sql, parameters);
  if (vacation) {
    return true;
  }
  return false;
}

//get liked vacations for user
async function getLikedVacationsForUser(userID) {
  let sql = `select vacation_id from liked_vacations where user_id = ?`;
  let parameters = [userID];
  let [vacations] = await connection.executeWithParameters(sql, parameters);
  if (vacations) {
    return vacations;
  }
  return null;
}

//get users by vacation id
async function getUsersByVacationID(vacationID) {
  let sql = `select user_id from liked_vacations where vacation_id = ?`;
  let parameters = [vacationID];
  let [users] = await connection.executeWithParameters(sql, parameters);
  if (users) {
    return users;
  }
  return null;
}

module.exports = {
  addVacationToLikedVacations,
  deleteVacationFromLikedVacations,
  isVacationInLikedVacations,
  getLikedVacationsForUser,
  getUsersByVacationID,
  getAllLikedVacations,
};
