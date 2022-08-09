const express = require("express");
const router = express.Router();
const UsuariosController = require("../controllers/user-controller");

router.post("/", UsuariosController.getUser);

module.exports = router;