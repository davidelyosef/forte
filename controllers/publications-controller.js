const express = require("express");
const publicationLogic = require("../bll/publications-logic");

const router = express.Router();

// get all publications
router.get("/", async (req, res) => {
    try {
        const publications = await publicationLogic.getAllPublications()
        res.json(publications);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// get one publication
router.get("/:_id", async (req, res) => {
    try {
        const publicationID = req.params._id;
        const publication = await publicationLogic.getOnePublication(publicationID);
        res.json(publication);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// add publication
router.post("/", async (req, res) => {
    try {
        const newPub = req.body;
        const addedPub = await publicationLogic.addPublication(newPub);
        res.status(201).json(addedPub);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// patch publication
router.patch("/:_id", async (req, res) => {
    try {
        const id = req.params._id;
        const pub = req.body;
        pub._id = id;
        const newPub = await publicationLogic.patchPublication(pub);
        res.json(newPub);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// delete publication
router.delete("/:_id", async (req, res) => {
    try {
        const id = req.params._id;
        await publicationLogic.deletePublication(id);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;