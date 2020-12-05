const express = require("express");

const controller = require("../controllers/patients");

let router = express.Router();

/* GET home page. */
router.get("/", controller.findAll);

module.exports = router;
