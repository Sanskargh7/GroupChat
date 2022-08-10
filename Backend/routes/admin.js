const express=require('express')
const router=express.Router()
const adminController=require('../controller/admin')
const loginVerify=require('../middleware/auth')
router.post('/addMember',loginVerify,adminController.adminCheck,adminController.postAddMember)
router.post('/removeMember',loginVerify,adminController.adminCheck,adminController.postRemoveMember)
router.post('/makeAdmin',loginVerify,adminController.adminCheck,adminController.postMakeAdmin)
router.post('/removeAdmin',loginVerify,adminController.adminCheck,adminController.postRemoveAdmin)
module.exports=router