const express=require('express')
const router=express.Router()
const groupController=require('../controller/group')
const loginVerify=require('../middleware/auth')
router.post('/creategroup',loginVerify,groupController.createGroup)
router.get('/getgroups',loginVerify,groupController.getGroup)
router.get('/isAdmin',loginVerify,groupController.getIsAdmin)
//router.post('/addUsertogroup',loginVerify,groupController.addusertoGroup)
module.exports=router
