const express = require("express");
const router = express.Router();
const vacationDal = require("../dal/vacations-dal");

router.get("/", async (request, response) => {
  try {
    let allVacations = await vacationDal.getAllVacations();
    response.send(allVacations);
  } catch {
    response.sendStatus(500);
  }
});

router.delete("/:id", async (request, response) => {
  try {
    await vacationDal.deleteVacation(parseInt(request.params.id));
    response.json("Vacation Deleted");
  } catch (e) {
    console.error(e);
    response.status(600).send(e.message);
  }
});

router.post("/", async (request, response) => {
  try {
    let vacation = request.body;
    vacation.amountOfFollowers = 0;
    await vacationDal.addVacation(vacation);
    response.json("Vacation was saved");
  } catch (e) {
    console.error(e);
    response.status(600).send(e.message);
  }
});

router.patch("/:id", async (request, response) => {
  try {
    const vacation = request.body;
    const result = await vacationDal.updateVacation(vacation);
    response.send(result);
  } catch (e) {
    console.error(e);
    response.status(600).send(e.message);
  }
});

module.exports = router;
