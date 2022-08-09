const db = require("../database");

const savePayment = async (req, res) => {
  const { id, detail, initial_value, date } = req.body;
  const register_date = null;

  const newPayment = {
    id,
    detail,
    initial_value,
    date,
    register_date,
  };

  await db.query(
    "INSERT INTO payments set ?",
    [newPayment],
    (err, paymentsStored) => {
      if (err)
        return res
          .status(500)
          .send({ respuesta: "Error al guardar el cobro." });

      if (!paymentsStored)
        return res
          .status(404)
          .send({ respuesta: "No se ha podido guardar el cobro" });

      return res.status(201).send({
        respuesta: "El cobro se registro correctamente",
      });
    }
  );
};

const getPayments = async (req, res) => {
  await db.query(
    "SELECT id, detail, initial_value, DATE_FORMAT(date, '%Y-%m-%d') AS date FROM payments WHERE state = '1' ORDER BY register_date DESC",
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al consultar los cobros." });

      if (rows.length === 0)
        return res
          .status(200)
          .send({ res: "No existen cobros registrados" });

      return res.status(200).send({
        desserts: rows,
      });
    }
  );
};

const deletePayment = async (req, res) => {

  const id = req.params.id;

  await db.query(
    "DELETE FROM payments WHERE id = ?",[id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al eliminar el cobros." });

      return res.status(200).send({
        res: "Cobro eliminado correctamente",
      });
    }
  );
};

const updatePayment = async (req, res) => {

  const id = req.params.id;  
  const { detail, initial_value, date } = req.body;


  await db.query(
    "UPDATE payments SET detail = ?, initial_value = ?, date = ?  WHERE id = ?",[detail, initial_value, date, id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al actualizar el cobros." });

      return res.status(200).send({
        res: "Cobro actualizado correctamente",
      });
    }
  );
};

module.exports = {
  savePayment,
  getPayments,
  deletePayment,
  updatePayment,
};
