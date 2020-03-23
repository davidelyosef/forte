const express = require("express");
const eventLogic = require("../bll/events-logic");

const router = express.Router();

// get all events
router.get("/", async (req, res) => {
    try {
        const events = await eventLogic.getAllEvents()
        res.json(events);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// get one event
router.get("/:_id", async (req, res) => {
    try {
        const eventID = req.params._id;
        const event = await eventLogic.getOneEvent(eventID);
        res.json(event);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});


// add event
router.post("/", async (req, res) => {
    try {
        const newEvent = req.body;
        const addedEvent = await eventLogic.addEvent(newEvent);
        res.status(201).json(addedEvent);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});


// patch event
router.patch("/:_id", async (req, res) => {
    try {
        const id = req.params._id;
        const event = req.body;
        event._id = id;
        const newEvent = await eventLogic.updateEvent(event);
        res.json(newEvent);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// delete event
router.delete("/:_id", async (req, res) => {
    try {
        const id = req.params._id;
        await eventLogic.deleteEvent(id);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;