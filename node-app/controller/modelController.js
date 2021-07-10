const jsforce= require('jsforce');
const deepRemove= require('../utils/deepRemove');

require('dotenv').config();

const { API_VERSION } = process.env;
const LENGTH_TYPE = 'Length';
const PRICE_TYPE = 'Price'; 
const TYPE_TYPE = 'Type'; 

const getBoatTypes=(req,res,next)=>{
    var conn = new jsforce.Connection({...req.cookies,version:API_VERSION});
    conn.query("SELECT Name, Id FROM BoatType__c ORDER BY Name", function(err, result) {
        if (err) {
            res.status(400).json(err)
        }
        else{
            req.success=true;
            req.rawResponse=result;
            next()
        }
    });
}

const getAllReviews=(req,res,next)=>{
    console.log(req.params.boatId);
    var conn = new jsforce.Connection({...req.cookies,version:API_VERSION});
    conn.query(`SELECT Id, Name, Comment__c, Rating__c, LastModifiedDate, CreatedDate,  CreatedById,CreatedBy.Name, CreatedBy.SmallPhotoUrl,`
    +`CreatedBy.CompanyName FROM BoatReview__c WHERE Boat__c ='${req.params.boatId}' ORDER BY CreatedDate DESC`, function(err, result) {
        if (err) {
            res.status(400).json(err)
        }
        else{
            req.success=true;
            req.rawResponse=result;
            next()
        }
    });
}

const getBoats=(req,res,next)=>{
    var conn = new jsforce.Connection({...req.cookies,version:API_VERSION});
    let query='select id,name,contact__r.name,contact__r.Id,boatType__r.Id,picture__c,Year_built__c,description__c,GeoLocation__Latitude__s,GeoLocation__Longitude__s,Price__c,BoatType__r.Name,Length__c from Boat__c'
    query+=req.params.boatTypeId?` WHERE BoatType__c='${req.params.boatTypeId}'`:''
    conn.query(query, function(err, result) {
        if (err) {
            res.status(400).json(err)
        }
        else{
            req.success=true;
            req.rawResponse=result;
            next()
        }
    });
}

const getBoatsByLocation=(req,res,next)=>{
    const {latitude,longitude} = req.query
    var conn = new jsforce.Connection({...req.cookies,version:API_VERSION});
    let query='SELECT Name, Geolocation__Latitude__s,Contact__r.Name,BoatType__r.Name, Geolocation__Longitude__s FROM Boat__c'
    query+=req.params.boatTypeId?` WHERE BoatType__c='${req.params.boatTypeId}'`:''
    query += ` ORDER BY DISTANCE(Geolocation__c, GEOLOCATION(${latitude}, ${longitude}), 'mi') LIMIT 10`;
    conn.query(query, function(err, result) {
        if (err) { 
            res.status(400).json(err)
        }
        else{
            req.success=true;
            req.rawResponse=result;
            next();
        }
    });
}


const createRecord=(req,res,next)=>{
    var conn = new jsforce.Connection({...req.cookies,version:API_VERSION});
    conn.sobject(req.params.apiName).create(req.body, function(err, result) {
        if (err) { 
            res.status(400).json(err)
        }
        else{
            req.success=true;
            req.rawResponse=result;
            next();
        }
    });
}

const updateRecord=(req,res,next)=>{
    var conn = new jsforce.Connection({...req.cookies,version:API_VERSION});
    conn.sobject(req.params.apiName).update(req.body, function(err, result) {
        console.log(err)
        if (err) { 
            res.status(400).json(err)
        }
        else{
            req.success=true;
            req.rawResponse=result;
            next();
        }
    });
}


const searchRecord=(req,res,next)=>{
    var conn = new jsforce.Connection({...req.cookies,version:API_VERSION});
    let query=`SELECT Id,Name FROM ${req.query.apiName} where Name LIKE '${req.query.searchText}%' LIMIT 10`;
    conn.query(query, function(err, result) {
        if (err) { 
            res.status(400).json(err)
        }
        else{
            req.success=true;
            req.rawResponse=result;
            next();
        }
    });
}

const restructureResponse=(req,res,next)=>{
    if(req.success){
        if(req.rawResponse.records){
            let records=req.rawResponse.records
            deepRemove(records,['attributes']);
            res.status(200).json({success:req.success,records})
        }
        else{
            res.status(200).json({success:req.success,result:req.rawResponse})
        }
    }
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

module.exports={
                getBoatTypes,
                restructureResponse,
                getAllReviews,
                getBoats,
                getBoatsByLocation,
                createRecord,
                updateRecord,
                searchRecord
            }