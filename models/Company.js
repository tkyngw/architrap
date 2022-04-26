const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name : String,
    address : String,
    city : String,
    size : String,
    projectPhase : Number,
    projectType : String,
    review : [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company

