const express = require("express");
const router = express.Router();
const ReportsController = require("../controllers/reports-controller");

router.get("/getCreditsExpired/:id", ReportsController.getCreditsExpired);

module.exports = router;