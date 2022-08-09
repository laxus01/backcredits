const db = require("../database");
const jwt = require("jsonwebtoken");
const llave = require("../configs/config");

const payload = {
  check: true,
};
const token = jwt.sign(payload, llave.llave, {
  expiresIn: 1440,
});

const getUser = async (req, res) => {
  const { login, password } = req.body;
  await db.query(
    "SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?",
    [login, password],
    (err, rows) => {
      if (err)
        return res
          .status(500)
          .send({ respuesta: "Error al consultar el usuario" });

      if (rows.length === 0)
        return res
          .status(404)
          .send({ respuesta: "Usuario o contraseña incorrectos" });

      return res.status(200).send({
        res: {
          message: "Autenticación correcta",
          token: token,
        },
      });
    }
  );
};

module.exports = {
  getUser,
};
