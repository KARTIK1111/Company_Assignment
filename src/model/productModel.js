//---importing mongoose dependacy to create a model -----//
const mongoose = require('mongoose')


//----------creating model for products-----------------//

const productModel = new mongoose.Schema({
    Name: {
        type: String,
        require: true
    },
    Company: {
        type: String,
        require: true
    },
    Description: {
        type: String,
        require: true
    },
    Type: {
        type: String,
        require: true
    },
    Price: {
        type: Number,
        require: true
    },
    Rating: {
        type: Number,
        require: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })


//---exporting product model----//

module.exports = mongoose.model('Product', productModel)