const express = require("express");
const router = express.Router();
const ClientsController = require("../controllers/clients-controller");

router.post("/", ClientsController.saveClient);
router.get("/", ClientsController.getClients);
/*router.delete("/:id", ClientsController.deletePayment);
router.patch("/:id", ClientsController.updatePayment); */

module.exports = router;