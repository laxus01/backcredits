const db = require("../database");

const saveCredit = async (req, res) => {
  const { id, payment_id, client_id, value, date, next, previous, register_date, mode } = req.body;
  const total_value = value * 1000;
  const total = total_value + total_value * 0.2;
  const newNext = next ? next : 0;
  const newPrevious = previous ? previous : 0;
  const state = 1;

  const newCredit = {
    id,
    next: newNext,
    previous: newPrevious,
    payment_id,
    client_id,
    value: total_value,
    date,
    total,
    mode,
    state,
    register_date,
    mode,
  };

  db.query("INSERT INTO credits set ?", [newCredit], (err, newCredit) => {
    if (err)
      return res
        .status(500)
        .send({ respuesta: "Error al guardar el credito." });

    if (!newCredit)
      return res
        .status(404)
        .send({ respuesta: "No se ha podido guardar el credito" });

    return res.status(201).send({
      respuesta: "El credito se registro correctamente",
    });
  });
};

const savePaid = async (req, res) => {
  const { id, credit_id, value, date } = req.body;
  const total_value = value * 1000;

  const newPaid = {
    id,
    credit_id,
    value: total_value,
    date,
  };

  db.query("INSERT INTO paids set ?", [newPaid], (err, newPaid) => {
    if (err)
      return res
        .status(500)
        .send({ respuesta: "Error al guardar el pago." });

    if (!newPaid)
      return res
        .status(404)
        .send({ respuesta: "No se ha podido guardar el pago" });

    return res.status(201).send({
      respuesta: "El pago se registro correctamente",
    });
  });
};

const getCredits = async (req, res) => {

  const id = req.params.id;

  db.query(
    "SELECT cr.id, c.name, cr.total, DATE_FORMAT(cr.date, '%Y-%m-%d') AS date FROM clients c, credits cr WHERE c.id = cr.client_id AND payment_id = ? ORDER BY cr.register_date DESC", [id],
    (err, rows) => {
      if (err)
        return res
          .status(500)
          .send({ res: "Error al consultar los clientes." });

      if (rows.length === 0)
        return res.status(200).send({ res: "No existen clientes registrados" });

      return res.status(200).send({
        credits: rows,
      });
    }
  );
};

const getActualState = async (req, res) => {

  const id = req.params.paymentId;

  db.query(
    "SELECT SUM(value) AS total_credits, SUM(total) AS total, (SELECT SUM(p.value) FROM credits c, paids p WHERE c.payment_id = ? AND c.id = p.credit_id AND c.state = '1') total_paids FROM credits WHERE payment_id = ? AND state = '1' ", [id, id],
    (err, rows) => {
      if (err)
        return res
          .status(500)
          .send({ res: "Error al consultar los clientes." });

      if (rows.length === 0)
        return res.status(200).send({ res: "No existen clientes registrados" });

      return res.status(200).send({
        state: rows,
      });
    }
  );
};

const deleteCredit = async (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM credits WHERE id = ?", [id], (err, rows) => {
    if (err)
      return res.status(500).send({ res: "Error al eliminar el credito." });

    return res.status(200).send({
      res: "Credito eliminado correctamente",
    });
  });
  
  this.deletePaids(id)
};

function deletePaids(id) {

  db.query("DELETE FROM paids WHERE credit_id = ?", [id], (err, rows) => {
    if (err) return console.log(err);
    console.log(rows);
  });
};

const deletePaid = async (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM paids WHERE id = ?", [id], (err, rows) => {
    if (err)
      return res.status(500).send({ res: "Error al eliminar el pago." });

    return res.status(200).send({
      res: "Pago eliminado correctamente",
    });
  });
};

const creditInitial = async (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT cr.id, c.name, cr.value, cr.total, DATE_FORMAT(cr.date, '%Y-%m-%d') AS date, cr.mode, (cr.total - (SELECT COALESCE(SUM(VALUE), 0) FROM paids WHERE credit_id = cr.id)) AS balance, (SELECT COALESCE(SUM(VALUE), 0) FROM paids WHERE credit_id = cr.id) AS total_paid, cr.previous, cr.next FROM clients c, credits cr WHERE c.id = cr.client_id AND cr.previous = '0' AND cr.state = 1 AND cr.payment_id = ?",
    [id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al consultar el credito." });

      if (rows.length === 0)
        return res.status(200).send({ res: "No existen creditos registrados" });

      return res.status(200).send({
        credit: rows,
      });
    }
  );
};

const currentCredit = async (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT cr.id, c.name, cr.value, cr.total, cr.mode, DATE_FORMAT(cr.date, '%Y-%m-%d') AS date, (cr.total - (SELECT COALESCE(SUM(VALUE), 0) FROM paids WHERE credit_id = cr.id)) AS balance, (SELECT COALESCE(SUM(VALUE), 0) FROM paids WHERE credit_id = cr.id) AS total_paid, cr.previous, cr.next FROM clients c, credits cr WHERE c.id = cr.client_id AND cr.id = ?",
    [id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al consultar el credito." });

      if (rows.length === 0)
        return res.status(200).send({ res: "No existen creditos registrados" });

      return res.status(200).send({
        credit: rows,
      });
    }
  );
};

const finalCredit = async (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT id FROM credits WHERE next = '0' AND state = '1' AND payment_id = ?",
    [id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al consultar el credito final." });

      if (rows.length === 0)
        return res.status(201).send({ res: "No existe el credito final" });

      return res.status(200).send({
        creditFinal: rows,
      });
    }
  );
};

const updatePrevious = async (req, res) => {

  const id = req.params.id;  
  const { next } = req.body;

  db.query(
    "UPDATE credits SET next = ?  WHERE id = ?",[next, id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al actualizar el credito." });

      return res.status(200).send({
        res: "El credito anterior actualizado correctamente",
      });
    }
  );
};

const updateNext = async (req, res) => {

  const id = req.params.id;  
  const { previous } = req.body;

  db.query(
    "UPDATE credits SET previous = ?  WHERE id = ?",[previous, id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al actualizar el credito." });

      return res.status(200).send({
        res: "El credito siguiente actualizado correctamente",
      });
    }
  );
};

const activateCredit = async (req, res) => {

  const id = req.params.id;  
  const state = 1;

  db.query(
    "UPDATE credits SET state = ?  WHERE id = ?",[state, id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al actualizar el credito." });

      return res.status(200).send({
        res: "El credito siguiente actualizado correctamente",
      });
    }
  );
};

const inactivateCredit = async (req, res) => {

  const id = req.params.id;  
  const state = 0;

  db.query(
    "UPDATE credits SET state = ?  WHERE id = ?",[state, id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al actualizar el credito." });

      return res.status(200).send({
        res: "El credito siguiente actualizado correctamente",
      });
    }
  );
};

const totalCredits = async (req, res) => {
  const paymentId = req.params.paymentId;
  const date = req.params.date;

  db.query(
    "SELECT COALESCE(SUM(VALUE), 0) AS total FROM credits WHERE payment_id = ? AND date = ?",
    [paymentId, date],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al consultar el balance." });

      if (rows.length === 0)
        return res.status(200).send({ res: "No existe balance para este dia" });

      return res.status(200).send({
        totalCredits: rows,
      });
    }
  );
};

const totalPaids = async (req, res) => {
  const paymentId = req.params.paymentId;
  const date = req.params.date;

  db.query(
    "SELECT COALESCE(SUM(p.value), 0) AS total FROM paids p, credits c WHERE p.credit_id = c.id AND c.payment_id = ? AND p.date = ?",
    [paymentId, date],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al consultar el balance." });

      if (rows.length === 0)
        return res.status(200).send({ res: "No existe balance para este dia" });

      return res.status(200).send({
        totalPaids: rows,
      });
    }
  );
};

const saveDailyBalance = async (req, res) => {
  const { id, payment_id, date, base, bills, delivery } = req.body;
  const newBase = base * 1000
  const newBills = bills * 1000

  const newBalance = {
    id,
    payment_id,
    date,
    base: newBase,
    bills: newBills,
    delivery,
  };

  db.query("INSERT INTO daily_balance set ?", [newBalance], (err, newBalance) => {
    if (err)
      return res
        .status(500)
        .send({ respuesta: "Error al guardar el balance." });

    if (!newBalance)
      return res
        .status(404)
        .send({ respuesta: "No se ha podido guardar el balance" });

    return res.status(201).send({
      respuesta: "El balance se registro correctamente",
    });
  }); 
};



const getPaidsByDay = async (req, res) => {
  
  const id = req.params.paymentId;
  const date = req.params.date;

  db.query(
    "SELECT p.id, cr.id AS credit_id, cr.next, cr.previous, cr.state, (SELECT (c.total - (SUM(p.value))) FROM paids p, credits c WHERE c.id = p.credit_id AND c.id = cr.id) AS balance, p.id, c.name, DATE_FORMAT(p.date, '%Y-%m-%d') AS date, p.value FROM clients c, credits cr, paids p WHERE c.id = cr.client_id AND cr.id = p.credit_id AND cr.payment_id = ? AND p.date = ? ORDER BY p.register_date ASC", [id, date],
    (err, rows) => {
      if (err)
        return res
          .status(500)
          .send({ res: "Error al consultar los pagos." });

      if (rows.length === 0)
        return res.status(200).send({ res: "No existen pagos registrados en esta fecha" });

      return res.status(200).send({
        paids: rows,
      });
    }
  );
};

const getCreditsByDay = async (req, res) => {

  const id = req.params.paymentId;
  const date = req.params.date;

  db.query(
    "SELECT cr.id, cr.previous, cr.next, c.name, DATE_FORMAT(cr.date, '%Y-%m-%d') AS date, cr.value FROM clients c, credits cr WHERE c.id = cr.client_id AND cr.state = '1' AND cr.payment_id = ? AND cr.date = ? ORDER BY c.register_date ASC", [id, date],
    (err, rows) => {
      if (err)
        return res
          .status(500)
          .send({ res: "Error al consultar los pagos." });

      if (rows.length === 0)
        return res.status(200).send({ res: "No existen pagos registrados en esta fecha" });

      return res.status(200).send({
        credits: rows,
      });
    }
  );
};

const updatePaid = async (req, res) => {

  const id = req.params.id;  
  const { date, value } = req.body;
  
  const total_value = value * 1000;


  db.query(
    "UPDATE paids SET date = ?, value = ?  WHERE id = ?",[date, total_value, id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al actualizar el pago." });

      return res.status(200).send({
        res: "El pago se actualizo correctamente",
      });
    }
  );
};

const updateCredit = async (req, res) => {

  const id = req.params.id;  
  const { date, value } = req.body;
  
  const total_value = value * 1000;
  const total = total_value + total_value * 0.2;

  db.query(
    "UPDATE credits SET date = ?, value = ?, total = ?  WHERE id = ?",[date, total_value, total, id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al actualizar el credito." });

      return res.status(200).send({
        res: "El credito siguiente actualizado correctamente",
      });
    }
  );
};

module.exports = {
  saveCredit,
  getCredits,
  deleteCredit,
  deletePaid,
  creditInitial,
  currentCredit,
  savePaid,
  updatePrevious,
  updateNext,
  finalCredit,
  activateCredit,
  inactivateCredit,
  totalCredits,
  totalPaids,
  saveDailyBalance,
  getPaidsByDay,
  getCreditsByDay,
  updatePaid,
  updateCredit,
  deletePaids,
  getActualState,
};
