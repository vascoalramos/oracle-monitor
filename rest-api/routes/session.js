const express = require("express");

const controller = require("../controllers/session");

let router = express.Router();

// GET sessions history
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

// GET sessions count history
router.get("/total/history", (req, res) => {
    if ("groupBy" in req.query) {
        let groupBy = req.query.groupBy;
        if (["minute", "hour", "day", "month", "year"].includes(groupBy)) {
            controller
                .group_history_count(groupBy)
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
            .list_history_count()
            .then((data) => {
                res.status(200).jsonp(data);
            })
            .catch((error) => {
                res.status(500).jsonp(error);
            });
    }
});

module.exports = router;
