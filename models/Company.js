const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name : String,
    address : String,
    size : Number,
    Projects : {
        phase : Number,
        type : String
    },
    review : [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company

