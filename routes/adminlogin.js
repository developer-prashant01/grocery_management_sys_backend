var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

router.post('/chk_company_login',function(req,res){
    //console.log("body",req.body)
   // console.log("hello")

    pool.query('select * from company where (emailaddress=? or mobilenumber=?) and password=? and status="Verified" ',[req.body.emailaddress,req.body.emailaddress,req.body.password],function(error,result){
        if(error){
            res.status(200).json({status:false,message:'server error'})
            
        }
        else
        {
            if(result.length==0)
            {
                
                res.status(200).json({status:false,message:'server invalid emailaddress/ mobile number/password'})
                
            }
            else
            {
                
                //console.log("data",result)   
                res.status(200).json({data:result[0],status:true,message:'valid login'})
                
            }
        }


    })


})

module.exports = router;