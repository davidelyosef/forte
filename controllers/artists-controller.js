const express = require("express");
const artistsLogic = require("../bll/artists-logic");

const router = express.Router();

// get all artists
router.get("/", async (req, res) => {
    try {
        const artists = await artistsLogic.getAllArtists();
        res.json(artists);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// get one artist
router.get("/:fullName", async (req, res) => {
    try {
        const fullName = req.params.fullName;
        const artist = await artistsLogic.getOneArtist(fullName);
        res.json(artist);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});


// add one artist
router.post("/", async (request, response) => {
    try {
        const artist = request.body;
        const addedArtist = await artistsLogic.addOneArtist(artist);
        response.status(201).json(addedArtist);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});



//update one artist
router.patch("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const artist = request.body;
        artist._id = _id;
        const updatedArtist = await artistsLogic.updateArtist(artist);
        response.json(updatedArtist);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


// delete one artist
router.delete("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        await artistsLogic.deleteArtist(_id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;