const express = require("express");
const {
  addFaqCategory,
  getFaqCategories,
  addFaq,
  getFaqs,
  deleteFaq,
  editFaq,
} = require("../controller/faq.controller");

const router = express.Router();

router.get("/", getFaqs);
router.post("/", addFaq);
router.patch("/:faqId", editFaq);
router.delete("/:faqId", deleteFaq);
router.get("/category", getFaqCategories);
router.post("/category", addFaqCategory);

module.exports = router;
