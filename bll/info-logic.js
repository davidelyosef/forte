const mongoose = require("mongoose");
  
// create schema for artist 
const infoSchema = mongoose.Schema({
    galleryName: String,
    address: String,
    phone: String,
    email: String,
    open: String,
    img: String
}, { versionKey: false });


const Info = mongoose.model("Info", infoSchema, "info"); // Model, Schema, Collection

function getAllInfos() {
    return new Promise((res, rej) => {

        Info.find({}).exec((err, Infos) => {
            if (err) return rej(err);
            res(Infos);
        });
    });

}

function getOneInfo(_id) {
    return new Promise((res, rej) => {
        Info.findById(_id, (err, Info) => {
            if (err) return rej(err);
            res(Info);
        });
    });
}

function updateInfo(info) {
    return new Promise((res, rej) => {
        const newInfo = new Info(info);
        Info.updateOne({ _id: info._id }, newInfo, (err, info) => {
            if (err) return rej(err);
            res(newInfo);
        });
    });
}

module.exports={
    getAllInfos,
    getOneInfo,
    updateInfo
}