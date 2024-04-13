const AuthModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const secret = process.env.secretKey;
const sendEmail = require("../Utils/sendEmail");

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
              .send({ success: true, message: "User created sucessfully" });
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
              expiresIn: 60 * 5,
            });
            return res.status(200).json({
              success: true,
              message: "Sign In successful",
              token: token,
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

// function forgotPassword(req, res) {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({
//       success: false,
//       message: "Email is missing",
//     });
//   }
//   Model.findOne({ email: email })
//     .then((response) => {
//       if (response && response._id) {
//         return res.status(200).json({
//           success: true,
//           message: "user found, Forgot password allowed",
//           uid: response._id,
//         });
//       } else {
//         return res.status(400).json({
//           success: false,
//           message: "Account does not exists!",
//         });
//       }
//     })
//     .catch((error) => {
//       return res.status(500).json({
//         success: false,
//         message: error,
//       });
//     });
// }

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
      const send_to = email;
      // const sent_from = process.env.EMAIL_USER;
      const reply_to = email;
      const subject = "Reset Password - Reg";
      const message = `
        <h3>Hello! Here is your New password Link</h3>
        <a href="">Reset PassWord</a>`;

    await sendEmail(subject, message, send_to, reply_to);
    return res.status(200).json({ success: true, message: "Email Sent successfully" });
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

module.exports = { createUser, signInUser, forgotPassword };
