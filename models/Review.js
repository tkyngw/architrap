const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    username: String,
    name:String,
    yearsWorked:String,
    enviroment : String,
    salary : String,
    overtime : String,
    diversity: String,
    benefits: String,
    comments : String,
    owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review

