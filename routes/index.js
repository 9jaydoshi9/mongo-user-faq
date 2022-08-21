const express = require("express");
const userRoute = require("./user.route");
const faqRoute = require("./faq.route");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.use("/user", userRoute);
router.use("/faq",auth, faqRoute);

module.exports = router;
