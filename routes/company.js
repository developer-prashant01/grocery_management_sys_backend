var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer')

/* api to add products. */

router.post('/add_new_company',upload.single('logo'), function(req, res, next) {
   // console.log("body",req.body)
    console.log("files",req.file)
    pool.query("insert into company (companyname, ownername, emailaddress, mobilenumber, address, state, city, logo, password, status, createdat, updateat, createdby) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.companyname,req.body.ownername,req.body.emailaddress,req.body.mobilenumber,req.body.address,req.body.state,req.body.city,req.file.originalname,req.body.password,req.body.status,req.body.createat,req.body.updateat,req.body.createdby],function(error,result){
      
      if(error)
      {
          console.log("ERRORxxxxxxxxxxx",error)
          res.status(500).json({status:false,message:'server error'})
      }
      else
      {
            console.log(result)
          res.status(200).json({status:true,message:'company registered successfully'})
      }
  
    }) ;
  });

             /* api to get all the data . */

  router.get('/fetchAllCompanies', function(req, res, next) {
    pool.query("select c.*,(select cc.cityname from cities cc where c.city=cc.cityid)as cityname,(select s.statename from state s where c.state=s.stateid)as statename from company c",function(error,result){
  
      if(error)
      {
         // console.log(error)
          res.status(200).json({status:false,message:'server error'})
      }
      else
      {
          res.status(200).json({status:true,data:result})
      }
  
    }) ;
  });


      /* api to insert updated  data . */
  router.post('/edit_company_data', function(req, res, next) {
    
     pool.query("update company set companyname=?, ownername=?, emailaddress=?, mobilenumber=?, address=?, state=?, city=?, status=?,updateat=?, createdby=? where companyid=?",[req.body.companyname,req.body.ownername,req.body.emailaddress,req.body.mobilenumber,req.body.address,req.body.state,req.body.city,req.body.status,req.body.updateat,req.body.createdby,req.body.companyid],function(error,result){
       
       if(error)
       {
           console.log("ERRORxxxxxxxxxxx",error)
           res.status(200).json({status:false,message:'server error'})
       }
       else
       {
             console.log(result)
           res.status(200).json({status:true,message:'company registered successfully'})
       }
   
     }) ;
   });

    /* api to  updated  data  logo. */


    router.post('/update_company_logo',upload.single('logo'), function(req, res, next) {
       console.log("body",req.body)
        console.log("files",req.file)

    pool.query("update company set logo=? where companyid=?",[req.file.originalname,req.body.companyid],function(error,result){
      
      if(error)
      {
          console.log("ERRORxxxxxxxxxxx",error)
          res.status(200).json({status:false,message:'server error'})
      }
      else
      {
            console.log(result)
          res.status(200).json({status:true,message:'logo updated'})
      }
  
    }) ;
  });

   /* api to  delete company. */


    router.post('/delete_company', function(req, res, next) {
      console.log("body",req.body)
      pool.query("delete from company where companyid=?",[req.body.companyid],function(error,result){
      
      if(error)
      {
          console.log("ERRORxxxxxxxxxxx",error)
          res.status(200).json({status:false,message:'server error'})
      }
      else
      {
           // console.log(result)
          res.status(200).json({status:true,message:'company deleted succsessfully'})
      }

    }) ;
    });

   
module.exports = router;
