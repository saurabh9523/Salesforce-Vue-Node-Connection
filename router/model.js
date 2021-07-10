const express=require('express')
const router= express.Router()
const {
    getBoatTypes, 
    restructureResponse,
    getBoats,
    getAllReviews,
    getBoatsByLocation,
    createRecord,
    updateRecord,
    searchRecord
} =require('../controller/modelController')

router.get('/getBoatTypes',getBoatTypes)
router.get('/getBoats',getBoats)
router.get('/getBoats/:boatTypeId',getBoats)
router.get('/getAllReviews/:boatId',getAllReviews)
router.get('/getBoatsByLocation',getBoatsByLocation)
router.get('/getBoatsByLocation/:boatTypeId',getBoatsByLocation)
router.get('/searchRecord',searchRecord)
router.post('/createRecord/:apiName',createRecord)
router.post('/updateRecord/:apiName',updateRecord)
router.use(restructureResponse)
module.exports=router
