const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    category : {
        type: String,
        require: true
    },
    measureIn : {
        type: String,
        require: true
    },
    productImage : {
        type: String,
        require: true
    },
    productName_en: {
        type: String,
        require: true
    },
    productName_kn : {
        type: String,
        require: true
    },
    productPrice : {
        type: Number,
        require: true
    },
    addedDate : {
        type: Date,
        require: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Products', productsSchema)