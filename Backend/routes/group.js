const express=require('express')
const router=express.Router()
const groupController=require('../controller/group')
const loginVerify=require('../middleware/auth')
router.post('/creategroup',loginVerify,groupController.createGroup)
router.get('/getgroups',loginVerify,groupController.getGroup)
router.get('/isAdmin',loginVerify,groupController.getIsAdmin)

module.exports=router
