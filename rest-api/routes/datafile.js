const express = require("express");

const controller = require("../controllers/datafile");

let router = express.Router();

// GET datafiles
router.get("/", (req, res) => {
    if ("tablespace" in req.query) {
        controller
            .filter_history(req.query.tablespace)
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
