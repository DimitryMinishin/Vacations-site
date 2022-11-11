const express = require("express");
const cors = require("cors");
const port = 3001;
const usersController = require("./controllers/users-controller");
const vacationsController = require("./controllers/vacations-controller");
const likedVacationsController = require("./controllers/likedVacations-controller");
const loginFilter = require("./filters/login-filter");
const ErrorHandler = require("./errors/error-handler");
const server = express();

server.use(cors({ origin: "http://localhost:3000" }));
// server.use(loginFilter());
server.use(express.json());
server.use("/users", usersController);
server.use("/vacations", vacationsController);
server.use("/likedVacations", likedVacationsController);
server.use(ErrorHandler);
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
