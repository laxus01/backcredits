const express = require("express");
const router = express.Router();
const CreditsController = require("../controllers/credits-controller");

router.post("/", CreditsController.saveCredit);
router.post("/paid", CreditsController.savePaid);
router.post("/paid/saveDailyBalance", CreditsController.saveDailyBalance);
router.get("/:id", CreditsController.getCredits);
router.delete("/:id", CreditsController.deleteCredit);
router.get("/initial/:id", CreditsController.creditInitial);
router.get("/current/:id", CreditsController.currentCredit);
router.get("/final/:id", CreditsController.finalCredit);
router.put("/previous/:id", CreditsController.updatePrevious);
router.put("/next/:id", CreditsController.updateNext);
router.put("/inactivate/:id", CreditsController.inactivateCredit);
router.get("/totalCredits/paymentId/:paymentId/date/:date", CreditsController.totalCredits);
router.get("/totalPaids/paymentId/:paymentId/date/:date", CreditsController.totalPaids);

module.exports = router;