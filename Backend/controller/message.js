const express=require('express')

const Message=require('../models/message')
const Group=require('../models/group')
const addMessage=(req,res)=>{
    const groupid=req.body.groupid
    let message=req.body.msg
    const user=req.user
    console.log(user)
    let username=req.user.name
    user.createMessage({
        msg:message,
        name:username,
        gId:groupid
    }).then(result=>{
        console.log(result)
        res.status(200).json({result})
    }).catch(err=>console.log(err))
}
const getMessage=async(req,res)=>{
   
    let groupid=req.query.grpId
    await Message.findAll({where:{gId:groupid}})
    .then(msgs=>{
        console.log(msgs)
        res.status(200).json({msgs})
    }).catch(err=>{
        console.log(err)
    })
}
module.exports={addMessage,getMessage}