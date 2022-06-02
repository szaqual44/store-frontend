const express = require('express');
const router = express.Router()
const Product = require('../models/Product')

// ADD NEW PRODUCT TO DATABASE
router.post('/add', async(req,res)=>{
    const newProduct = new Product({
        name:req.body.name,
        desc:req.body.desc,
        price:req.body.price,
        img:req.body.img,
        cat:req.body.cat,
    })   
    try {     
        const savedProduct = await newProduct.save();
        res.status(206).json(savedProduct);
    } catch(err){
        res.status(506).json(err)
    }
})

//UPDATE PRODUCT
router.put('/update',(req,res) =>{

})

// GET ALL PRODUCTS
router.get('/', async (req,res)=>{
    const qCategory = req.query.category;
    console.log(qCategory) 
    try{
        let products;
        if (qCategory){
            products = await Product.find({
                cat: {
                    $in:[qCategory]
                }
            })
        } else {
            products = await Product.find()
        }

        res.status(200).json(products);
    } catch(err){
        console.log(err)
    }
})

// GET ONE PRODUCT
 
router.get('/:_id', async (req,res)=>{  
    try{
        const product = await Product.findById(req.params._id)
        // console.log(req.params._id)
        // console.log(product)
        res.json(product)
    } catch(err){
        res.status(500).json(err)
    }
})



module.exports = router;


