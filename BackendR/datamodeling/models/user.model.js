const mongoose = require('mongoose');

const {Schema} = require('mongoose')

const userSchema = new Schema({

    firstName : {
        type: String
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String
    },
    emailId : {
        type: String,
        unique: true,
    },
    password: {
        type: String
    },
    photoId: {
        type: String
    }

},{timestamps: true})

const User = mongoose.model("user", userSchema)

module.exports = User