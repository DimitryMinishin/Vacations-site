const usersDal = require("../dal/users-dal");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const config = require("../config.json");

async function addUser(userData) {
  validateUserData(userData);
  if (await usersDal.isUserNameExist(userData.userName)) {
    throw new Error("User name already exist");
  }
  normalizeOptionalData(userData);
  userData.password = encryptPassword(userData.password);
  await usersDal.addUser(userData);
}

async function login(userLoginData) {
  userLoginData.password = encryptPassword(userLoginData.password);
  let userData = await usersDal.login(userLoginData);
  console.log(userData);
  if (!userData) {
    throw new Error("Login failed");
  }

  const token = jwt.sign(
    { userId: userData.id, userType: userData.userType },
    config.secret
  );

  let successfulLoginResponse = {
    token,
    firstName: userData.firstName,
    lastName: userData.lastName,
  };
  return successfulLoginResponse;
}

function validateUserData(userRegistrationData) {
  if (!userRegistrationData.userName) {
    throw new Error("Invalid user name or password");
  }

  if (!userRegistrationData.password) {
    throw new Error("Invalid user name or password");
  }

  if (userRegistrationData.password.length < 6) {
    throw new Error("Password is too short");
  }
}

function encryptPassword(password) {
  const saltRight = "sdkjfhdskajh";
  const saltLeft = "--mnlcfs;@!$ ";
  let passwordWithSalt = saltLeft + password + saltRight;
  return crypto.createHash("md5").update(passwordWithSalt).digest("hex");
}

function normalizeOptionalData(userRegistrationData) {
  if (!userRegistrationData.firstName) {
    userRegistrationData.firstName = "";
  }

  if (!userRegistrationData.lastName) {
    userRegistrationData.lastName = "";
  }
}

module.exports = {
  addUser,
  login,
};
