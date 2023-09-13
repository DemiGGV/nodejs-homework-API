const nodemailer = require("nodemailer");

const { SERVER_URL, UN_PASS, UN_USER, UN_SERVER, UN_PORT } = process.env;

const sendMail = async (email, verificationToken) => {
  const config = {
    host: UN_SERVER,
    port: UN_PORT,
    secure: true,
    auth: {
      user: UN_USER,
      pass: UN_PASS,
    },
  };

  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: UN_USER,
    to: email,
    subject: "Email login confirmation",
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
