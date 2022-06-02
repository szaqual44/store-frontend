const jwt = require('jsonwebtoken')

 function veryfiToken(req,res,next){
    const authHeader = req.headers.token
    if (authHeader){
        const token = authHeader.split(" ")[1];     
        jwt.verify(token,process.env.JWT_KEY, (err,user)=>{
            if (err) {
                res.json("Token is not valid!")
            } else {
                req.user = user 
                next()
            }
        })
    } else {
        return res.json("You are not authenticated")
    }
 };

 function veryfiTokenAndAuthorization(req,res,next){
    veryfiToken(req,res,()=>{
        if (req.user.id==req.params.id || req.user.isAdmin){
            next()
        }else {
            res.json("You are not allowed to do that!")
        }
    });   
 }

function veryfiTokenAndAdmin(req,res,next){
    veryfiToken(req,res, ()=>{
        if (req.user.isAdmin){
            next()
        } else {
            res.json("You are not admin!")
        }
    })
}



 module.exports = {
    veryfiToken,
    veryfiTokenAndAuthorization,
    veryfiTokenAndAdmin
 };