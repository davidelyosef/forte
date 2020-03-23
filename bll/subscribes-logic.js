const mongoose = require("mongoose");
  
// create schema for artist 
const subscribesSchema = mongoose.Schema({
    email: String,
    name: String
}, { versionKey: false });


const Subscribe = mongoose.model("Subscribe", subscribesSchema, "subscribes"); // Model, Schema, Collection

function getAllSubscribes() {
    return new Promise((res, rej) => {

        Subscribe.find({}).exec((err, Subscribes) => {
            if (err) return rej(err);
            res(Subscribes);
        });
    });
}

function getOneSubscribe(_id) {
    return new Promise((res, rej) => {
        Subscribe.findById(_id, (err, subscribe) => {
            if (err) return rej(err);
            res(subscribe);
        });
    });
}

function addSubscription(subscribe) {
    return new Promise((res, rej) => {
        const newSub = new Subscribe(subscribe);
        newSub.save((err, sub) => {
            if (err) return rej(err);
            res(sub);
        });
    });
}

function deleteOneSubscription(_id) {
    return new Promise((res, rej) => {
        Subscribe.deleteOne({ _id }, (err, sub) => {
            if (err) return rej(err);
            res();
        });
    });
}

function deleteAllSubscriptions() {
    return new Promise((res, rej) => {
        Subscribe.remove({}, (err, sub) => {
            if (err) throw err;
            res();
        });
    });
}

module.exports={
    getAllSubscribes,
    getOneSubscribe,
    addSubscription,
    deleteOneSubscription,
    deleteAllSubscriptions
}