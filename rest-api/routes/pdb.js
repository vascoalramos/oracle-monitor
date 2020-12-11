const express = require("express");

const controller = require("../controllers/pdb");

let router = express.Router();

// GET pdbs
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

// GET pdbs history
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
