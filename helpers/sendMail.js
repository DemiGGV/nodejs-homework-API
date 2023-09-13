const nodemailer = require("nodemailer");
// const { HttpError } = require("../helpers");
const { SERVER_URL, UN_PASS } = process.env;

const sendMail = async (email, verificationToken) => {
  const config = {
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
      user: "goit_nodejs77@ukr.net",
      pass: UN_PASS,
    },
  };

  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: "goit_nodejs77@ukr.net",
    to: email,
    subject: "Nodemailer test",
    html: `<a target="_blank" href="${SERVER_URL}/api/users/verify/${verificationToken}">Click here to verify your email GoIT George Goncharov</a>`,
  };
  try {
    await transporter.sendMail(emailOptions);
    return;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = sendMail;
