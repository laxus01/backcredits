const db = require("../database");

const getCreditsExpired = async (req, res) => {

  const id = req.params.id;

  db.query(
    "SELECT c.identification, c.name, c.phone, c.direction, cr.total, DATE_FORMAT(cr.date, '%Y-%m-%d') AS date, TIMESTAMPDIFF(DAY, cr.date, NOW()) AS days, cr.mode FROM clients c, credits cr WHERE cr.payment_id = ? AND c.id = cr.client_id AND cr.state = '1'", [id],
    (err, rows) => {
      if (err)
        return res
          .status(500)
          .send({ res: "Error al consultar los clientes." });

      if (rows.length === 0)
        return res.status(200).send({ res: "No existen clientes registrados" });

      return res.status(200).send({
        report: rows,
      });
    }
  );
};

module.exports = {
  getCreditsExpired,
};