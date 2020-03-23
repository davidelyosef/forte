const mongoose = require("mongoose");

// create schema for publication 
const publicationSchema = mongoose.Schema({
    fullName: String,
    bookName: String,
    bookDetails: String,
    video: String,
    mainImageName: String,
    allImages: Array,
    date: String
}, { versionKey: false });


const Publication = mongoose.model("Publication", publicationSchema, "publications"); // Model, Schema, Collection

function getAllPublications() {
    return new Promise((res, rej) => {

        Publication.find({}).exec((err, publications) => {
            if (err) return rej(err);
            res(publications);
        });
    });

}

function getOnePublication(_id) {
    return new Promise((res, rej) => {
        Publication.findById(_id, (err, publication) => {
            if (err) return rej(err);
            res(publication);
        });
    });
}

function addPublication(publication) {
    return new Promise((res, rej) => {
        const newPublication = new Publication(publication);
        newPublication.save((err, publication) => {
            if (err) return rej(err);
            res(publication);
        });
    });
}

function patchPublication(publication) {
    return new Promise((res, rej) => {
        const newPublication = publication;
        Publication.updateOne({ _id: publication._id }, newPublication, (err, publication) => {
            if (err) return rej(err);
            res(newPublication);
        });
    });
}

function deletePublication(_id) {
    return new Promise((res, rej) => {
        Publication.deleteOne({ _id }, (err, pub) => {
            if (err) return rej(err);
            res(pub);
        });
    });
}

module.exports = {
    getAllPublications,
    getOnePublication,
    addPublication,
    patchPublication,
    deletePublication
}