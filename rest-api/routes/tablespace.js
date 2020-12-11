const express = require("express");

const controller = require("../controllers/tablespace");

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
    let final_data = {};
    controller
        .list()
        .then((data) => {
            final_data["entities"] = data;
            controller
                .list_history()
                .then((data) => {
                    final_data["history"] = data;
                    res.status(200).jsonp(final_data);
                })
                .catch((error) => {
                    res.status(500).jsonp(error);
                });
        })
        .catch((error) => {
            res.status(500).jsonp(error);
        });
});

module.exports = router;
