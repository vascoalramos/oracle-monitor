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
            if ("groupBy" in req.query) {
                let groupBy = req.query.groupBy;
                if (["minute", "hour", "day", "month", "year"].includes(groupBy)) {
                    controller
                        .group_history(groupBy)
                        .then((data) => {
                            final_data["history"] = data;
                            res.status(200).jsonp(final_data);
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
                        final_data["history"] = data;
                        res.status(200).jsonp(final_data);
                    })
                    .catch((error) => {
                        res.status(500).jsonp(error);
                    });
            }
        })
        .catch((error) => {
            res.status(500).jsonp(error);
        });
});

module.exports = router;
