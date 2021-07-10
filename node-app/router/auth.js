const express=require('express')

const router= express.Router()
const {login,logout,validateSession,navigateToRecord} =require('../controller/authController')
router.post('/login',login)
router.post('/logout',logout)
router.post('/validateSession',validateSession)
router.get('/navigateToRecord/:recordId',navigateToRecord)
module.exports=router