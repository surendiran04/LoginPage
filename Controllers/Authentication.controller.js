const AuthModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const secret = process.env.secretKey;
const transporter = require("../Utils/sendEmail");

async function createUser(req, res) {
  try {
    const existingEmail = await AuthModel.findOne({
      email: req.body.email,
    });

    if (existingEmail) {
      return res
        .status(400)
        .send({ success: false, message: "EmailId already exists" });
    } else {
      if (req.body.password) {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
          if (hash) {
            let User = new AuthModel({ ...req.body, password: hash });
            User.save();
            return res
              .status(201)
              .send({ success: true, message: "User created sucessfully!Login Now" });
          } else {
            return res.status(500).json({
              success: false,
              message: "Something went wrong",
            });
          }
        });
      }
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: error.message,
    });
  }
}

function signInUser(req, res) {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is missing",
    });
  }
  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is missing",
    });
  }

  AuthModel.findOne({ email: email })
    .then((response) => {
      if (response && response._id) {
        bcrypt.compare(password, response.password).then(function (result) {
          //if result is true then both the pass are crt
          if (result) {
            const token = jwt.sign({ role: ["User"] }, secret, {
              expiresIn: 60 * 5, //session time
            });
            return res.status(200).json({
              success: true,
              message: "Sign In successful",
              token: token,
              user:response.Name,
            });
          } else {
            return res.status(400).json({
              //having a emailId checking whether entered pass is crt user using the db.pass
              success: false,
              message: "Email Id or Password is invalid!",
            });
          }
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Account does not exists!",
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        message: error,
      });
    });
}

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is missing",
    });
  }
  try {
    const user = await AuthModel.findOne({ email: email });
    if (user && user._id) {
      const token = jwt.sign({ id: user._id }, secret, {
        expiresIn: 3 * 60, //session time
      });
      const setusertoken = await AuthModel.findByIdAndUpdate(
        { _id: user._id },
        { verifytoken: token },
        { new: true }
      );
      if (setusertoken) {
        const options = {
          from: {
            name: "Web Admin",
            address: process.env.EMAIL_USER,
          },
          to: email,
          subject: "Reset Password - Reg",
          html: `<h3>Hello! Here is your New password Link</h3>
             <a href="http://localhost:5173/resetPassword/${user._id}/${token}">Click here</a>`,
        };

        // Send Email
        transporter.sendMail(options, function (err, info) {
          if (err) {
            return res.status(400).json({
              success: false,
              message: "Error occured!Try after sometime",
            });
          } else {
            return res
              .status(200)
              .json({ success: true, message: "Email Sent successfully" });
          }
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Account does not exists!",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};

const updatePass = async (req, res) => {
  const {password} = req.body;


  const { id, token } = req.params;

  if( !id && !token ){
    res
    .status(401)
    .json({ success: false, message: "Unauthorized Access!" });
  }

 
  try {
    const validuser = await AuthModel.findOne({ _id: id});

    const verifyToken = jwt.verify(token, secret);
    if (validuser._id == verifyToken.id) {

      const newpassword = await bcrypt.hash(password, saltRounds);
      const newuser = await AuthModel.findByIdAndUpdate(
        { _id: id },
        { password: newpassword }
      );

      newuser.save();
      res
        .status(201)
        .json({ success: true, message: "Password updated successfully" });
    } else {
      res
        .status(401)
        .json({ success: false, message: "User does not exists!" });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { createUser, signInUser, forgotPassword, updatePass };
