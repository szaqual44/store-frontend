const express = require('express');
const router = express.Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const { veryfiTokenAndAuthorization, veryfiTokenAndAdmin} = require('./veryfikation')


// UPDATE USER
router.put('/:id', veryfiTokenAndAuthorization , async (req,res)=>{
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_KEY).toString()
    }
    try{  
        const updateUser = await User.findOneAndUpdate(req.params.id,
            {
              $set: req.body,
            },
            { new: true }
        )
        return  res.json("Your data has been updated!");

    } catch(err){
        return  res.status(500).json(err);
    }
}) 

//DELETE USER
router.delete('/:id', veryfiTokenAndAuthorization , async (req,res)=>{
    try{  
        await User.findByIdAndDelete(req.params.id)
        res.json("Your data has been deleted!");
    } catch(err){
        res.status(500).json(err)
    }
})
 
//GET SINGLE USER
router.get('/:id', veryfiTokenAndAdmin, async (req,res) =>{
    try {
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc
        res.json(others)
    } catch (err){
        res.json(err)
    }
})
//GET ALL USERS
router.get('/', veryfiTokenAndAdmin, async (req,res) =>{
    try {
        const users = await User.find()
        const userWithoutPassword=[]
        users.forEach(user=>{
            const {password, ...others} = user._doc
            userWithoutPassword.push(others)
        })
        //RETURNING ARRAY -> NOT OBJECT
        res.json(userWithoutPassword)
    } catch (err){
        res.json(err)
    }
})


module.exports = router;


