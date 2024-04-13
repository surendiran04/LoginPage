const nodemailer = require('nodemailer')

    const transporter = nodemailer.createTransport({
      service:"gmail", 
      host: process.env.EMAIL_HOST, 
      port: "587",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      secure:false,
    });
  
    

  module.exports = transporter