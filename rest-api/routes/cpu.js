const express = require("express");

const controller = require("../controllers/cpu");

let router = express.Router();

// GET cpu history
router.get("/history", (req, res) => {
    if ("groupBy" in req.query) {
        let groupBy = req.query.groupBy;
        if (["minute", "hour", "day", "month", "year"].includes(groupBy)) {
            controller
                .group_history(groupBy)
                .then((data) => {
                    res.status(200).jsonp(data);
                })
                .catch((error) => {
                    res.status(500).jsonp(error);
                });
        } else {
            res.status(400).jsonp({ error: "Invalid parameters" });
        }
    } else {
        controller
            .list_history()
            .then((data) => {
                res.status(200).jsonp(data);
            })
            .catch((error) => {
                res.status(500).jsonp(error);
            });
    }
});

module.exports = router;
