const express = require("express");

const controller = require("../controllers/beds");

let router = express.Router();

/* GET home page. */
router.get("/", controller.findAll);

module.exports = router;
