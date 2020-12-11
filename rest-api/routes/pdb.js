const express = require("express");

const controller = require("../controllers/pdb");

let router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
    controller
        .findAll()
        .then((data) => {
            res.status(200).jsonp(data);
        })
        .catch((error) => {
            res.status(500).jsonp(error);
        });
});

module.exports = router;
