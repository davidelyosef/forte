const express = require("express");
const exhibitionsLogic = require("../bll/exhibitions-logic");

const router = express.Router();

// get all Exhibitions
router.get("/", async (req, res) => {
    try {
        const exhibitions = await exhibitionsLogic.getAllExhibitions()
        res.json(exhibitions);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// get one Exhibition
router.get("/:_id", async (req, res) => {
    try {
        const exhibitionID = req.params._id;
        const exhibition = await exhibitionsLogic.getOneExhibition(exhibitionID);
        res.json(exhibition);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// add one exhibition
router.post("/", async (request, response) => {
    try {
        const exhibition = request.body;
        const addedExhibition = await exhibitionsLogic.addExhibition(exhibition);
        response.status(201).json(addedExhibition);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});



//update one exhibition

router.patch("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const exhibition = request.body;
        exhibition._id = _id;
        const updatedExhibition = await exhibitionsLogic.updateExhibition(exhibition);
        response.json(updatedExhibition);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


// delete one exhibition
router.delete("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        await exhibitionsLogic.deleteExhibition(_id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


module.exports = router;