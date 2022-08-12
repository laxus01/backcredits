const express = require("express");
const router = express.Router();
const PaymentsController = require("../controllers/payments-controller");

router.post("/", PaymentsController.savePayment);
router.get("/", PaymentsController.getPayment);
router.delete("/:id", PaymentsController.deletePayment);
router.put("/update/:id", PaymentsController.updatePayment);
router.put("/inactivate/:id", PaymentsController.inactivatePayment);

module.exports = router;