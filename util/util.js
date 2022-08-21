const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { transporter } = require("../config/email.config");

const randomThreeDigits = () => (Math.random() + 1).toString(36).substring(2, 5);

const generateHash = async (data) => bcrypt.hash(data, 10); // salt rounds

const compareHash = async (password, hash) => bcrypt.compare(password, hash);

const generateToken = (user) =>
  jwt.sign(user, process.env.JWTSECRET || "SECRET", {
    expiresIn: "7d",
  });

const sendEmail = async (emailTo, emailData) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || "support@abc.ok", // sender address
      to: emailTo, // receiver email
      subject: emailData.subject,
      text: emailData.text,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  randomThreeDigits,
  generateHash,
  compareHash,
  generateToken,
  sendEmail,
};
