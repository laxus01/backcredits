const express = require("express");
const router = express.Router();
const PaymentsController = require("../controllers/payments-controller");

router.post("/", PaymentsController.savePayment);
router.get("/", PaymentsController.getPayment);
router.delete("/:id", PaymentsController.deletePayment);
router.patch("/:id", PaymentsController.updatePayment);

module.exports = router;