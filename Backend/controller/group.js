const Group=require('../models/group')
const User=require('../models/user')
const userGroup=require('../models/userGroup')
const createGroup=(req,res)=>{
    let groupname=req.body.groupname
   
    req.user.createGroup({
        groupname:groupname,
        
    }).then(ress=>{
        
        userGroup.update({isAdmin:true},{where:{userId:req.user.id}})
        .then(result=>{
            res.status(200).json('group added')
        })

    }).catch(err=>{
        console.log(err)
    })
}
const getGroup=(req,res)=>{
    
    req.user.getGroups()
    .then(groups=>{
        res.status(200).json({groups})
    }).catch(err=>{
        console.log(err)
    })
}

const getIsAdmin =(req,res)=>{
    const groupid= req.query.grpId
    userGroup.findOne({where:{
        userId:req.user.id,
        groupid:groupid
    }})
    .then(user=>{
        res.status(200).json({user})
    }).catch(err=>{
        console.log(err)
    })
}
module.exports={createGroup,getGroup,getIsAdmin}