const express = require("express");

const {
  startInterview,
  submitAnswer,
  getInterviews,
  getInterview,
} = require("../controller/interviewcontroller");

const { protect }= require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.post("/start", startInterview);
router.post("/submit-answer", submitAnswer);
router.get("/", getInterviews);
router.get("/:id", getInterview);

module.exports = router;