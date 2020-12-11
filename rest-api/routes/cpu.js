const express = require("express");

const controller = require("../controllers/cpu");

let router = express.Router();

// GET cpu history
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
