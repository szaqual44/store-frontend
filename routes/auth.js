const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')





//REGISTER
router.post('/register', async (req,res)=>{
        // signup data valdiation
    if (req.body.password==='') {
        res.json('Please, type the password')
        return
    }
    if (req.body.password==='' || req.body.passwordConfirm==='') {
        res.json('Please, confirm the password')
        return
    }
    if (req.body.password!==req.body.passwordConfirm) {
        res.json('Passwords do not match')
        return
    }

    let newUser = new User({
        email:req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_KEY).toString(),
    })   
    // console.log(newUser)
    try{  
        let savedUser = await newUser.save()
        res.status(206).json("New user registered");        
    } catch (err){
        res.json(err)
    }    
})

//LOGIN
router.post('/login', async (req,res)=>{
    
    if (req.body.email==='') {
        res.json('Please, type email!')
        return
    }
    if (req.body.password==='') {
        res.json('Please, type password!')
        return
    }

   try{
        const user = await User.findOne({
            email:req.body.email
        })
        const oryginalPassword = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8);
      
        const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        },process.env.JWT_KEY, {expiresIn:"1d"})
        // console.log(accessToken)

        if(!user)  {
            res.json('There is no user in DB')
            return
        }
        if (oryginalPassword!==req.body.password) {
            res.json('Wrong password! Try again!') 
            return 
        }   
 
        const {password, ...others} = user._doc
   
        res.status(200).json({...others,accessToken})
   }catch (err){
       res.json(err)
   }
})



module.exports = router;


