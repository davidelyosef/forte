const mongoose = require("mongoose");

// Connect to the database: 
mongoose.connect("mongodb://localhost:27017/forte",
    { useNewUrlParser: true, useUnifiedTopology: true }, (err, mongoClient) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("We're connected to " + mongoClient.name + " database on MongoDB...");
    });
    
// create schema for artist 
const artistSchema = mongoose.Schema({
    fullName: String,
    content: String,
    readMoreContent: String,
    mainImageName: Object,
    imageProps: [],
    status: String,
    croppedPicture: Object,
    cv: String
}, { versionKey: false });


const Artist = mongoose.model("Artist", artistSchema, "artists"); // Model, Schema, Collection

function getAllArtists() {
    return new Promise((resolve, reject) => {

        Artist.find({}).exec((err, artists) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(artists);
        });
    });

}

function getOneArtist(_id) {
    return new Promise((resolve, reject) => {
        Artist.findById(_id, (err, artist) => {
            if (err) return reject(err);
            resolve(artist);
        });
    });
}

function addOneArtist(artist) {
    return new Promise((resolve, reject) => {
        const newArtist = new Artist(artist);
        newArtist.save((err, newArtist) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(newArtist);
        });
    });
}

function updateArtist(artist) {
    return new Promise((resolve, reject) => {
        Artist.updateOne({ _id: artist._id }, artist, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(artist);
        });
    });
}

function deleteArtist(_id) {
    return new Promise((resolve, reject) => {
        Artist.deleteOne({ _id }, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

module.exports={
    getAllArtists,
    getOneArtist,
    addOneArtist,
    deleteArtist,
    updateArtist
}