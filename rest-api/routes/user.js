const express = require("express");

const controller = require("../controllers/user");

let router = express.Router();

// GET users history
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
