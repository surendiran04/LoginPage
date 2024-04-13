const nodemailer = require('nodemailer')

const sendEmail = async (subject, message, send_to, reply_to,) => {
    const transporter = nodemailer.createTransport({
      service:"gmail", 
      host: process.env.EMAIL_HOST, 
      port: "587",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      secure:false,
      // tls: {
      //   rejectUnauthorized:false,
      // },
    });
  
    const options = {
      from:{
        name:"Web Admin",
        address:process.env.EMAIL_USER,
      },
      to: send_to,
      replyTo: reply_to,
      subject: subject,
      html: message,
    };
  
    // Send Email
    transporter.sendMail(options, function (err, info) {
      if (err) {
        return err;
      } else {
        console.log(info)
      }
    });
  };
  module.exports = sendEmail