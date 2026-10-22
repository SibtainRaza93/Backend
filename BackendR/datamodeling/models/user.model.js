const mongoose = require('mongoose');

const {Schema} = require('mongoose')

const userSchema = new Schema({

    firstName : {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    emailId : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    photoId: {
        type: String
    }

},{timestamps: true})

const User = mongoose.model("user", userSchema)

module.exports = User