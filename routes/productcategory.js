var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer')

/* api to add categories. */

router.post('/add_new_category',upload.single('categoryLogo'), function(req, res, next) {
   // console.log("body",req.body)
   // console.log('Error',Error)
    //console.log("files",req.file)
    
    pool.query("insert into category (companyid, categoryname, description, icon,createdat, updateat, createdby) values (?,?,?,?,?,?,?)",[req.body.companyid,req.body.categoryname,req.body.description,req.file.originalname,req.body.createdat,req.body.updateat,req.body.createdby],function(error,result){
      
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


  /***************** fill category *******************/

  router.post('/fetch_category',function(req,res){

    pool.query("select * from category where companyid=?",[req.body.companyid],function(error,result){

        if(error)
        {
          console.log(error)
          res.status(500).json({status:false,massage:'server error'})

        }
        else
        {
          //console.log(result)
          res.status(200).json({status:true,data:result})
        }
    })
  })
  /*  api to edit the data*/

  router.post('/update_category_data',function(req,res){
    //console.log('pppppppp1',req.body)

    pool.query("update category set companyid=?,categoryname=?,description=? ,updateat=?, createdby=? where categoryid=?",[req.body.companyid,req.body.categoryname,req.body.description,req.body.updateat,req.body.createdby,req.body.categoryid],function(error,result){
      
      if(error)
      {
        //console.log("error",error)
        res.status(200).json({status:false,massage:'server error'})
      }
      else
      {
        res.status(200).json({status:true,data:result})
      }
    })
  })

    /*  Api to dalete particular data */

  router.post('/delete_data',function(req,res){
    console.log('pppppppp1',req.body)
    

    pool.query("delete from category where categoryid=?",[req.body.categoryid],function(error,result){

      if(error)
      {
        res.status(200).json({status:false,message:'server error'})
      }
      else
      {
        res.status(200).json({status:true,data:result})
      }

    })

  })

  module.exports = router;
