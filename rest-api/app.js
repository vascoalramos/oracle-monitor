const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const database = require("./resources/database");

const patientsRouter = require("./routes/patients");
const bedsRouter = require("./routes/beds");

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api/patients", patientsRouter);
app.use("/api/beds", bedsRouter);

database.checkConnection();

module.exports = app;
