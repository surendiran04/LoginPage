const {
    createUser,
    signInUser,
    forgotPassword,
    updatePass
  } = require("../Controllers/Authentication.controller");
 
  const AuthRouter = require("express").Router();
  
  AuthRouter.post("/signUp", createUser);
  AuthRouter.post("/signin", signInUser);
  AuthRouter.post("/forgotPassword",   forgotPassword);
  AuthRouter.patch("/resetPassword/:id/:token",  updatePass);
  
  module.exports = AuthRouter;
  