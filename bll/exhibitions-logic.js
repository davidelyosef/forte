const mongoose = require("mongoose");
  
// create schema for exhibition
const exhibitionSchema = mongoose.Schema({
    exhibitionName: String,
    exhibitionArtist: String,
    opening: String,
    closing: String,
    exhibitionDetails : Array,
    address: String,
    imgSrc: String,
    imgCover: String,
    exhibitionImages: Array, 
    status: String,
    exhibitionDetailsImageCover: Object,
    about: String,
    currator: Object
}, { versionKey: false });


const Exhibition = mongoose.model("Exhibition", exhibitionSchema, "exhibitions"); // Model, Schema, Collection

function getAllExhibitions() {
    return new Promise((res, rej) => {

        Exhibition.find({}).exec((err, exhibition) => {
            if (err) return rej(err);
            res(exhibition);
        });
    });

}

function getOneExhibition(_id) {
    return new Promise((res, rej) => {
        Exhibition.findById(_id, (err, exhibition) => {
            if (err) return rej(err);
            res(exhibition);
        });
    });
}

function addExhibition(exhibition) {
    return new Promise((resolve, reject) => {
        const newExhibition = new Exhibition(exhibition);
        newExhibition.save((err, newExhibition) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(newExhibition);
        });
    });
}

function updateExhibition(exhibition) {
    return new Promise((resolve, reject) => {
        const updatedExhibition = exhibition;
        Exhibition.updateOne({ _id: exhibition._id }, updatedExhibition, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(updatedExhibition);
        });
    });
}

function deleteExhibition(_id) {
    return new Promise((resolve, reject) => {
        Exhibition.deleteOne({ _id }, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

module.exports={
    getAllExhibitions,
    getOneExhibition,
    addExhibition,
    deleteExhibition,
    updateExhibition
}