import nodemailer from "nodemailer";

let transporter: any;
const sendEmail = async (email: string, subject: string, message: string) => {
  //1. create a transporter
  if (process.env.NODE_ENV === "production") {
    transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      auth: {
        user: process.env.OUTLOOK_USERNAME,
        pass: process.env.OUTLOOK_PASSWORD,
      },
    });
  } else if (process.env.NODE_ENV === "development") {
    transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      logger: true,
    });
  }

  //2. define the email options

  const mailOptions = {
    from: "omolams@outlook.com",
    to: email,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, function (error: any) {
    if (error) {
      console.log(error.message);
    } else {
      console.log("Message Sent>>>");
    }
  });
};
export default sendEmail;

/**
 * 
 JWT_SECRET_KEY=Postgres_twit
  JWT_EXPIRES_IN=5h
  NODE_ENV=development
  EMAIL_USERNAME=cb19b38a56a78c
  EMAIL_PASSWORD=eddc04c62606b1
  EMAIL_HOST='smtp.mailtrap.io'
  EMAIL_PORT=2525
  OUTLOOK_USERNAME=omolams@outlook.com
  OUTLOOK_PASSWORD=Password@
 */