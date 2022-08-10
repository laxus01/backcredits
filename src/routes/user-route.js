const express = require("express");
const router = express.Router();
const UsuariosController = require("../controllers/user-controller");

router.post("/", UsuariosController.getUser);
router.get("/", UsuariosController.test);

module.exports = router;