const {
    createUser,
    signInUser,
    forgotPassword
    // updateUser,
  } = require("../Controllers/Authentication.controller");
 
  const AuthRouter = require("express").Router();
  
  AuthRouter.post("/signUp", createUser);
  AuthRouter.post("/signin", signInUser);
  AuthRouter.post("/forgotPassword",   forgotPassword);
  // AuthRouter.post("/sendmail", sendMail);
  // AuthRouter.patch("/update/:uid", updateUser);
  
  module.exports = AuthRouter;
  