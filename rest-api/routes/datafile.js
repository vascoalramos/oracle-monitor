const express = require("express");

const controller = require("../controllers/datafile");

let router = express.Router();

// GET datafiles
router.get("/", (req, res) => {
    if ("tablespace" in req.query) {
        controller
            .filter(req.query.tablespace)
            .then((data) => {
                res.status(200).jsonp(data);
            })
            .catch((error) => {
                res.status(500).jsonp(error);
            });
    } else {
        controller
            .list()
            .then((data) => {
                res.status(200).jsonp(data);
            })
            .catch((error) => {
                res.status(500).jsonp(error);
            });
    }
});

// GET datafiles history
router.get("/history", (req, res) => {
    let final_data = {};

    let tablespace_exists = "tablespace" in req.query;

    let tablespace = req.query.tablespace;

    controller
        .list()
        .then((data) => {
            final_data["entities"] = data;
            let groupBy_exists = "groupBy" in req.query;

            if (tablespace_exists && groupBy_exists) {
                let groupBy = req.query.groupBy;
                if (groupBy_belongs(groupBy)) {
                    controller
                        .group_filtered_history(groupBy, tablespace)
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
            } else if (tablespace_exists) {
                controller
                    .filter_history(tablespace)
                    .then((data) => {
                        final_data["history"] = data;
                        res.status(200).jsonp(final_data);
                    })
                    .catch((error) => {
                        res.status(500).jsonp(error);
                    });
            } else if (groupBy_exists) {
                let groupBy = req.query.groupBy;
                if (groupBy_belongs(groupBy)) {
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
            }
        })
        .catch((error) => {
            res.status(500).jsonp(error);
        });
});

let groupBy_belongs = (groupBy) => {
    return ["minute", "hour", "day", "month", "year"].includes(groupBy);
};

module.exports = router;
