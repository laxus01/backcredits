const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors')
const config = require("./configs/config");
const paymentsPath = "/api/payments";
const clientsPath = "/api/clients";
const creditsPath = "/api/credits";
const reportsPath = "/api/reports";
const usersPath = "/users";

// Intializations
const app = express();

// Settings
app.set("port", process.env.PORT || 8084);

app.set("llave", config.llave);

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use(paymentsPath, require("./routes/payments-route"));
app.use(clientsPath, require("./routes/clients-route"));
app.use(creditsPath, require("./routes/credits-route"));
app.use(reportsPath, require("./routes/reports-route"));
app.use(usersPath, require("./routes/user-route"));


app.use((error, req, res, next) => {
  res.status(400).json({
    status: "error",
    message: error.message,
  });
});

// Starting
app.listen(app.get("port"), () => {
  console.log("Server is in port", app.get("port"));
});


