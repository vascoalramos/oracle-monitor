const express = require("express");

const controller = require("../controllers/datafile");

let router = express.Router();

// GET tablespaces
router.get("/", (req, res) => {
    controller
        .list()
        .then((data) => {
            res.status(200).jsonp(data);
        })
        .catch((error) => {
            res.status(500).jsonp(error);
        });
});

// GET tablespaces history
router.get("/history", (req, res) => {
    controller
        .list_history()
        .then((data) => {
            res.status(200).jsonp(data);
        })
        .catch((error) => {
            res.status(500).jsonp(error);
        });
});

module.exports = router;
