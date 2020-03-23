const express = require("express");
const subLogic = require("../bll/subscribes-logic");

const router = express.Router();

// get all Subscription
router.get("/", async (req, res) => {
    try {
        const subscribes = await subLogic.getAllSubscribes()
        res.json(subscribes);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// get one Subscription
router.get("/:_id", async (req, res) => {
    try {
        const subID = req.params._id;
        const sub = await subLogic.getOneSubscribe(subID);
        res.json(sub);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// add
router.post("/", async (req, res) => {
    try {
        const sub = req.body;
        const newSub = await subLogic.addSubscription(sub);
        res.status(201).json(newSub);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// delete one subscribe
router.delete("/:_id", async (req, res) => {
    try {
        const id = req.params._id;
        await subLogic.deleteOneSubscription(id);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// delete all subscriptions
router.delete("/", async (req, res) => {
    try {
        await subLogic.deleteAllSubscriptions();
        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;