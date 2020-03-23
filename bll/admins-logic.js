const mongoose = require("mongoose");
const crypto = require('crypto');

// create schema for Admins 
const adminSchema = mongoose.Schema({
    username: String,
    password: String,
}, { versionKey: false });

Admin = mongoose.model("Admin", adminSchema, "admins"); // Model, Schema, Collection

function getAllAdmins() {
    return new Promise((resolve, reject) => {

        Admin.find({}).exec((err, admins) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(admins);
        });
    });

}
module.exports = {
    getAllAdmins
}