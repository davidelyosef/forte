const mongoose = require("mongoose")

// create schema for carouselPictures 
const carouselSchema = mongoose.Schema({
    name: String,
    imageName: String,
}, { versionKey: false });


const Carousel = mongoose.model("Carousel", carouselSchema, "carousel"); // Model, Schema, Collection

function getAllCarouselPictures() {
    return new Promise((resolve, reject) => {

        Carousel.find({}).exec((err, carouselPictures) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(carouselPictures);
        });
    });
}

function getOneCarouselPicture(_id) {
    return new Promise((res, rej) => {
        Carousel.findById(_id, (err, image) => {
            if (err) return rej(err);
            res(image);
        });
    });
}

function addCarouselPicture(carouselPicture) {
    return new Promise((resolve, reject) => {
        const oneCarouselPicture = new Carousel(carouselPicture);
        oneCarouselPicture.save((err, oneCarouselPicture) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(oneCarouselPicture);
        });
    });
}

function deleteCarouselPicture(_id) {
    return new Promise((resolve, reject) => {
        Carousel.deleteOne({ _id }, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

function updateCarouselImage(image) {
    return new Promise((res, rej) => {
        const newImage = new Carousel(image);
        Carousel.updateOne({ _id: image._id }, newImage, (err, info) => {
            if (err) return rej(err);
            res(newImage);
        });
    });
}

module.exports = {
    getAllCarouselPictures,
    addCarouselPicture,
    deleteCarouselPicture,
    updateCarouselImage,
    getOneCarouselPicture,
}