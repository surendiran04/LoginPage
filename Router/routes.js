const {
    createUser,
    signInUser,
    // updateUser,
  } = require("../Controllers/Authentication.controller");
  
  const AuthRouter = require("express").Router();
  
  AuthRouter.post("/signUp", createUser);
  AuthRouter.post("/signin", signInUser);
  // AuthRouter.patch("/update/:uid", updateUser);
  
  module.exports = AuthRouter;
  