const User=require('../models/user')
const bcrypt=require('bcrypt')
var jwt=require('jsonwebtoken');

const saltRounds=10;
const isAuthenticate=async(req,res,next)=>{
    try{
        const token=req.header('Authorization')
       
        const userId=jwt.verify(token,'908763')
        console.log(typeof (userId))
        const user= await User.findByPk(Number(userId))
            console.log(user)
            req.user=user
            next()
        
    }catch(err){
        res.status(404).json({message:err})
    }
}

module.exports=isAuthenticate;
