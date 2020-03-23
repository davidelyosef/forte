const express = require("express");
const infoLogic = require("../bll/info-logic");

const router = express.Router();

// get all Info
router.get("/", async (req, res) => {
    try {
        const Info = await infoLogic.getAllInfos()
        res.json(Info);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// get one Info
router.get("/:_id", async (req, res) => {
    try {
        const infoID = req.params._id;
        const info = await infoLogic.getOneInfo(infoID);
        res.json(info);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// update
router.patch("/:_id", async (req, res) => {
    try {
        const id = req.params._id;
        const info = req.body;
        info._id = id;
        const newInfo = await infoLogic.updateInfo(info);
        res.json(newInfo);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;