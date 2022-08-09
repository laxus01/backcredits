const db = require("../database");

const saveClient = async (req, res) => {
  const { id, identification, name, phone, direction } = req.body;

  const newClient = {
    id,
    identification,
    name,
    phone,
    direction,
  };

  await db.query(
    "INSERT INTO clients set ?",
    [newClient],
    (err, clientsStored) => {
      if (err)
        return res
          .status(500)
          .send({ respuesta: "Error al guardar el cliente." });

      if (!clientsStored)
        return res
          .status(404)
          .send({ respuesta: "No se ha podido guardar el cliente" });

      return res.status(201).send({
        respuesta: "El cliente se registro correctamente",
      });
    }
  );
};

const getClients = async (req, res) => {
  await db.query(
    "SELECT id, name FROM clients ORDER BY name ASC",
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al consultar los clientes." });

      if (rows.length === 0)
        return res
          .status(200)
          .send({ res: "No existen clientes registrados" });

      return res.status(200).send({
        clients: rows,
      });
    }
  );
};

module.exports = {
  saveClient,
  getClients,
};
