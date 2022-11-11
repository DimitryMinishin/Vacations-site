const likedVacationsDal = require("../dal/likedVacations-dal");
const express = require("express");
const router = express.Router();
const vacationDal = require("../dal/vacations-dal");

// post liked vacation
router.post("/:id", async (request, response) => {
  try {
    let data = await likedVacationsDal.getAllLikedVacations(
      parseInt(request.params.id)
    );

    response.json(data);
  } catch (e) {
    console.error(e);
    response.status(600).send(e.message);
  }
});

// post liked vacation
router.post("/", async (request, response, next) => {
  let registrationLikedVacation = request.body;
  registrationLikedVacation.amount_of_followers = request.body.totalLike + 1;
  try {
    let successfulLikedVacationResponse =
      await likedVacationsDal.addVacationToLikedVacations(
        registrationLikedVacation
      );
    let addTotalFolloers = await vacationDal.updateVacationLikes(
      registrationLikedVacation
    );
    console.log(addTotalFolloers);
    response.json(successfulLikedVacationResponse);
  } catch (e) {
    console.error(e);
    response.status(600).send(e.message);
  }
});

//delete unliked vacation
router.delete(
  "/vacationId/:vacationid/userId/:userid/:like",
  async (request, response) => {
    let registrationUnlikedVacation = {
      vacationID: parseInt(request.params.vacationid),
      userID: parseInt(request.params.userid),
    };
    try {
      let successfulUnlikedVacationResponse =
        await likedVacationsDal.deleteVacationFromLikedVacations(
          registrationUnlikedVacation
        );
      let decodeURImentedVal = parseInt(request.params.like) - 1;
      let data = {
        likes: decodeURImentedVal,
        vacationID: registrationUnlikedVacation.vacationID,
      };
      let totalFollowDecrement =
        await vacationDal.updateAndDecrementVacationLikes(data);

      response.json(successfulUnlikedVacationResponse);
    } catch (e) {
      console.error(e);
      response.status(400).send(e.message);
    }
  }
);

module.exports = router;
