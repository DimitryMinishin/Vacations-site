const connection = require("./connection-wrapper");

// get all vacations
async function getAllVacations() {
  let sql =
    "select id AS id, destination AS destination, price AS price, amount_of_followers AS amountOfFollowers, is_followed AS isFollowed, start_date AS startDate, end_date AS endDate, image_Url AS imageUrl from vacations_table";
  return await connection.execute(sql);
}

//add vacation
async function addVacation(vacation) {
  try {
    let sql =
      "insert into vacations_table (destination, price, start_date, end_date, image_url) values (?, ?, ?, ?, ?)";
    return await connection.executeWithParameters(sql, [
      vacation.destination,
      vacation.price,
      vacation.startDate,
      vacation.endDate,
      vacation.imageUrl,
    ]);
  } catch (e) {
    console.log(e);
  }
}

//is vacation exist by name
async function isVacationExist(vacationDestination) {
  let sql = "select destination from vacations_table where destination = ?";
  return await connection.executeWithParameters(sql, [vacationDestination]);
}

//update vacation
async function updateVacation(vacation) {
  try {
    let sql =
      "update vacations_table set destination = ?, price = ?, start_date = ?, end_date = ?, image_url = ? where id = ?";
    return await connection.executeWithParameters(sql, [
      vacation.destination,
      vacation.price,
      vacation.startDate,
      vacation.endDate,
      vacation.imageUrl,
      vacation.id,
    ]);
  } catch (e) {
    console.log(e);
  }
}

//update total follwed
async function updateVacationLikes(vacation) {
  try {
    let sql =
      "update vacations_table set  amount_of_followers = ? where id = ?";
    return await connection.executeWithParameters(sql, [
      vacation.amount_of_followers,

      vacation.vacationID,
    ]);
  } catch (e) {
    console.log(e);
  }
}
async function updateAndDecrementVacationLikes(decrementedFollowers) {
  try {
    let sql =
      "update vacations_table set  amount_of_followers = ? where id = ?";
    return await connection.executeWithParameters(sql, [
      decrementedFollowers.likes,
      decrementedFollowers.vacationID,
    ]);
  } catch (e) {
    console.log(e);
  }
}
//delete vacation
async function deleteVacation(vacationId) {
  let sql = "delete from vacations_table where id = ?";
  return await connection.executeWithParameters(sql, [vacationId]);
}

module.exports = {
  getAllVacations,
  addVacation,
  updateVacation,
  deleteVacation,
  updateVacationLikes,
  updateAndDecrementVacationLikes,
};
