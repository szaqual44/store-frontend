const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            required: true,
        },
        desc: {
            type: String,
            required:true,
        },
        img: {
            type: String,
            required:true,
        }, 
        price: {
            type: Number,
            requierd: true
        },
        cat: {
            type: Array,
        }
     
    },
    {timestamps:true}
)

module.exports = mongoose.model('Product', productSchema)