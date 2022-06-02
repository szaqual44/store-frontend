const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const productRoute = require('./routes/product')
const categoryRoute = require('./routes/category')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')

// CORS
const cors = require('cors')
app.use(cors({
  origin: "http://localhost:3000",
  credentials:true
}))


// CONNECTING TO MONGO DB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO).then(()=>console.log("Connected to Mongo DB"));



// ROUTES
app.use(express.json())
app.use('/api/products',productRoute)
app.use('/api/categories',categoryRoute)
app.use('/api',authRoute)
app.use('/api/user',userRoute)




app.listen(process.env.PORT ,()=>console.log('Server is running on port ' +process.env.PORT ))














// function allowCors(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   }
//   app.use(allowCors);