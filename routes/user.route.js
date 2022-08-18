const express = require("express");
const { getUser } = require("../controller/user.controller");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, getUser);

module.exports = router;
