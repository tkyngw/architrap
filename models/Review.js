const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    salary : Number,
    environment : Number,
    overtime : Number,
    comments : [{
        body: String,
        date: Date
    }]
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review

