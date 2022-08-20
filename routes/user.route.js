const express = require("express");
const { getUser, createUser, userLogin, changePassword } = require("../controller/user.controller");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, getUser);
router.post("/", createUser);
router.post("/login", userLogin);
router.patch("/password", auth, changePassword);

module.exports = router;
