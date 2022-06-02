const express = require('express');
const router = express.Router()
const Category = require('../models/Category')

// ADD NEW CATEGORY TO DATABASE
router.post('/add', async(req,res)=>{
    const newCategory = new Category({       
        title:req.body.title,
        img:req.body.img,
    })   
    try {     
        const savedCategory = await newCategory.save();
        res.status(206).json(newCategory);
    } catch(err){
        res.status(506).json(err)
    }

})



// GET ALL CATEGORIES
router.get('/', async (req,res)=>{
    
    try{
        const categories = await Category.find()
        res.status(200).json(categories);
    } catch(err){
        console.log(err)
    }
})

// GET ONE PRODUCT
 
router.get('/:_id', async (req,res)=>{  
    try{
        const category = await Category.findById(req.params._id)
        // console.log(req.params._id)
        // console.log(product)
        res.json(category)
    } catch(err){
        res.status(500).json(err)
    }
})



module.exports = router;


