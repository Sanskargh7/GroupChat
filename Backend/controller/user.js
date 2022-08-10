const User=require('../models/user')
const bcrypt=require('bcrypt')
var jwt=require('jsonwebtoken')
const express = require('express')
const saltRounds=10
exports.createUser=(req,response)=>{
    const name=req.body.name;
    const email=req.body.email;

    const phoneNumber=req.body.phoneNumber;
    
    const password=req.body.password
    User.findAll({where:{email}})
    .then(res=>{
        if(res.length>0){
            return res.json({message:'User already exist'})
        }
        bcrypt.hash(password, saltRounds,function(err,hash){
            User.create({
                name,
                email,
                phoneNumber,
                password:hash
            }).then(res=>{
                console.log(res)
                response.json({
                    name:req.body.name,
                    email:req.body.email,
                    message:'successfully logged in'
                })
            }).catch(err=>console.log(err))
        })
    }).catch(err=>console.log(err))
}

exports.loginUser = (req,res)=>{
    const {email,password} = req.body;
    User.findAll({where:{email}})
    .then(users=>{
        if(users.length>0){
            bcrypt.compare(password, users[0].password, function(err,response){
                if(err){
                    console.log(err)
                    return res.status(400).json({message:"Something went wrong!!",success:false})
                }
                if(response){
                    const jwtToken = generateToken(users[0].id)
                    return res.json({token:jwtToken,success:true,message:'Logged in Successfully'})
                }else{
                    return res.status(401).json({message:"Wrong password! Please enter correct password...!"})
                }
            })
        }
        else{
            return res.status(404).json({message:"User not found! Please signup",success:false,err});
        }
    })
    .catch(err=>{
        res.status(400).json({message:"User not found! Please signup",success:false,err});
    })
}


function generateToken(id){
    console.log(id)
    return jwt.sign(id, '908763')
}

