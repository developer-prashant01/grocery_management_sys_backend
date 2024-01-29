var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer')

router.post('/add_banners',upload.any(), function(req, res, next) {
    // console.log("body",req.body)
    // console.log("files",req.files)
 console.log("eror",Error)
 var file_str=" "
 req.files.map((item)=>{
     file_str+=item.filename+","
 })

  pool.query("insert into banners (companyid, bannerpicture, status, createdby, createdat, updatedat) values (?,?,?,?,?,?)",[req.body.companyid,file_str,req.body.status,req.body.createdby,req.body.createdat,req.body.updatedat],function(error,result){
    
    if(error)
    {
        console.log("ERRORxxxxxxxxxxx",error)
        res.status(500).json({status:false,message:'server error'})
    }
    else
    {
        //console.log(result)
        res.status(200).json({status:true,message:'banner inserted successfully'})
    }

  }) ;
});


router.get('/fetch_banner_images', function(req, res, next) {
    //console.log("body",req.body)
    // console.log("files",req.files)
  pool.query("select * from banners  ",function(error,result){
    
    if(error)
    {
        console.log("ERRORxxxxxxxxxxx",error)
        res.status(500).json({status:false,data:[]})
    }
    else
    {

      
        if(result.length==0)
        {
            
            res.status(200).json({status:true,data:"no bannnerd"})    
        }
        else{
        // console.log(result)
        res.status(200).json({status:true,data:result})}
    }

  }) ;
});


module.exports = router;

