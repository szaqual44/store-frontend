const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String, 
            required: true,
            unique:true
        },
        products: [
            {
                productId: {
                    type:String
                },
                quantity: {
                    type:Number,
                    default:1
                }
            }
         ],
         adress: {
             city:{
                 type:String
             },
             street:{
                 type:String
             },
             houseNr:{
                 type:String
             },
             zip:{
                 type:String
             }
         },
         status: {
             type:String,
             default:"work in progress"
         }    
    },
    {timestamps:true}
)

module.exports = mongoose.model('Order', orderSchema)