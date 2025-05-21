const mongoose = require("mongoose")
const { stringify } = require("querystring")


const playSchema = new mongoose.Schema({
    player1:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    player2:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // start1: {
    //     type: Number,
    //     required: true
    // },
    // end1: {
    //     type: Number,
    //     required: true
    // },
    // current1: {
    //     type: Number,
    //     required: true
    // },
    // active1: {
    //     type: Boolean,
    //     default: false
    // },
    // steps1: {
    //     type: Number,
    //     default: 0
    // },
    // start2: {
    //     type: Number,
    //     required: true
    // },
    // end2: {
    //     type: Number,
    //     required: true
    // },
    // current2: {
    //     type: Number,
    //     required: true
    // },
    // active2: {
    //     type: Boolean,
    //     default: false
    // },
    // steps2: {
    //     type: Number,
    //     default: 0
    // },
}, {
    timestamps: true
});

module.exports = mongoose.model('Play', playSchema)
