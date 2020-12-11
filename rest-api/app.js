const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const database = require("./resources/database");
database.checkConnection();

const pdbRouter = require("./routes/pdb");

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api/pdbs", pdbRouter);

module.exports = app;
