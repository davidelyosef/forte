const mongoose = require("mongoose");
  
// create schema for event 
const eventSchema = mongoose.Schema({
    eventName: String,
    date: String,
    eventDetails: String,
    fileName: String,
    imageName: String,
    eventImages: Array,
    status: String,
    activeStatus: Boolean,
}, { versionKey: false });


const Event = mongoose.model("Event", eventSchema, "events"); // Model, Schema, Collection

function getAllEvents() {
    return new Promise((res, rej) => {

        Event.find({}).exec((err, events) => {
            if (err) return rej(err);
            res(events);
        });
    });

}

function getOneEvent(_id) {
    return new Promise((res, rej) => {
        Event.findById(_id, (err, event) => {
            if (err) return rej(err);
            res(event);
        });
    });
}


function addEvent(event) {
    return new Promise((res, rej) => {
        const eventToAdd = new Event(event);
        eventToAdd.save((err, event) => {
            if (err) return rej(err);
            res(event);
        });
    });
}

function updateEvent(event) {
    return new Promise((res, rej) => {
        Event.updateOne({ _id: event._id }, event, (err, info) => {
            if (err) return rej(err);
            res(event);
        });
    });
}

function deleteEvent(_id) {
    return new Promise((res, rej) => {
        Event.deleteOne({ _id }, (err, info) => {
            if (err) return rej(err);
            res();
        });
    });
}

module.exports={
    getAllEvents,
    getOneEvent,
    addEvent,
    updateEvent,
    deleteEvent
}