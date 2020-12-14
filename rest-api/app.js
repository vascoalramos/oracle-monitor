const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const database = require("./resources/database");
database.checkConnection();

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// endpoints
const pdbRouter = require("./routes/pdb");
const memoryRouter = require("./routes/memory");
const userRouter = require("./routes/user");
const cpuRouter = require("./routes/cpu");
const sessionRouter = require("./routes/session");
const tablespaceRouter = require("./routes/tablespace");
const datafileRouter = require("./routes/datafile");

app.use("/api/pdbs", pdbRouter);
app.use("/api/memory", memoryRouter);
app.use("/api/users", userRouter);
app.use("/api/cpu", cpuRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/tablespaces", tablespaceRouter);
app.use("/api/datafiles", datafileRouter);

// documentation
const swaggerUi = require("swagger-ui-express");
const documentation = require("./documentation");
app.use("/api", swaggerUi.serve, swaggerUi.setup(documentation));

module.exports = app;
