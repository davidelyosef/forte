const express = require("express");
const carouselPicturesLogic = require("../bll/carousel-pictures-logic");

const router = express.Router();

// get all carousel Pictures
router.get("/", async (req, res) => {
    try {
        const carouselPictures = await carouselPicturesLogic.getAllCarouselPictures();
        res.json(carouselPictures);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// get one
router.get("/:_id", async (req, res) => {
    try {
        const carouselID = req.params._id;
        const carousel = await carouselPicturesLogic.getOneCarouselPicture(carouselID);
        res.json(carousel);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

router.post("/", async (request, response) => {
    try {
        const carouselPicture = request.body;
        const addedCarouselPicture = await carouselPicturesLogic.addCarouselPicture(carouselPicture);
        response.status(201).json(addedCarouselPicture);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// delete carousel image
router.delete("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        await carouselPicturesLogic.deleteCarouselPicture(_id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// patch carousel image
router.patch("/:_id", async (req, res) => {
    try {
        const id = req.params._id;
        const image = req.body;
        image._id = id;
        const newImage = await carouselPicturesLogic.updateCarouselImage(image);
        res.json(newImage);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;