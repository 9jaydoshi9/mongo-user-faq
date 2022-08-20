const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const randomThreeDigits = () => (Math.random() + 1).toString(36).substring(2, 5);

const generateHash = async (data) => bcrypt.hash(data, 10); // salt rounds

const compareHash = async (password, hash) => bcrypt.compare(password, hash);

const generateToken = (user) => jwt.sign(user, process.env.JWTSECRET || 'SECRET', {
  expiresIn: '7d',
});

module.exports = {
  randomThreeDigits,
  generateHash,
  compareHash,
  generateToken,
};