var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer')

/*----------------Fetch all categories for explore by categories---------->>>>>>>>>>>>>>>>>>>>>>>>>>> */
router.post('/fetch_all_categories', function(req, res, next) {
    console.log("body",req.body)
    // console.log("files",req.files)
  pool.query("select * from category where companyid=?",[req.body.companyid],function(error,result){
    
    if(error)
    {
        console.log("ERRORxxxxxxxxxxx",error)
        res.status(500).json({status:false,data:[]})
    }
    else
    {
        // if(result.length==0)
        // {
            
        //     res.status(200).json({status:true,data:"no bannnerd"})    
        // }
       //   console.log(result)
        res.status(200).json({status:true,data:result})
    }

  }) ;
});

/*----------------Fetch all productdeals in focus for explore by categories---------->>>>>>>>>>>>>>>>>>>>>>>>>>> */
router.get('/fetch_all_Bestdeals', function(req, res, next) {
  //console.log("body",req.body)
  // console.log("files",req.files)
pool.query("select * from products where deals='yes' ",function(error,result){
  
  if(error)
  {
      console.log("ERRORxxxxxxxxxxx",error)
      res.status(500).json({status:false,data:[]})
  }
  else
  {
      // if(result.length==0)
      // {
          
      //     res.status(200).json({status:true,data:"no bannnerd"})    
      // }
      
      //  console.log(result)
      res.status(200).json({status:true,data:result})
  }

}) ;
});

/*----------------Fetch all productdeals in focus for explore by categories---------->>>>>>>>>>>>>>>>>>>>>>>>>>> */
router.get('/fetch_all_productsTreanding', function(req, res, next) {
 // console.log("body",req.body)
  // console.log("files",req.files)
pool.query("select * from products where treanding='yes' ",function(error,result){
  
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
       // console.log(result)
      res.status(200).json({status:true,data:result})
  }

  
}) ;
});


/*  fetch all list product on categorywise product on the basis of categories */


router.post('/fetch_category_products',function(req,res){
  pool.query('select PL.*,(select P.productname from products P where P.productid=PL.productid) as productname,(select P.pricetype from products P where P.productid=PL.productid) as pricetype,(select P.image from products P where P.productid=PL.productid) as productimage from listproduct PL where categoryid=?',[req.body.categoryid],function(error,result){
      if(error)
      {
          res.status(200).json({status:false,data:[]})
      }
      else
      {
        //console.log('resulreeeeeee',result)
          res.status(200).json({status:true,data:result})
      }
  })
})


/*  fetch all list product on categorywise product on the basis of productid  here we are showing the type of products of same produc*/


router.post('/fetch_trending_products_by_productid',function(req,res){
  pool.query('select PL.*,(select P.productname from products P where P.productid=PL.productid) as productname,(select P.pricetype from products P where P.productid=PL.productid) as pricetype,(select P.image from products P where P.productid=PL.productid) as productimage from listproduct PL where productid=?',[req.body.productid],function(error,result){
      if(error)
      {
          res.status(200).json({status:false,data:[]})
      }
      else
      {
        //console.log('resulreeeeeee',result)
          res.status(200).json({status:true,data:result})
      }
  })
})


router.post('/add_new_user', function(req, res, next) {
  // console.log("body",req.body)
   
   pool.query("select * from usersdata where mobileno=?",[req.body.mobileno],function(error,result){
     
     if(error)
     {
         console.log("ERRORxxxxxxxxxxx"+error)
         res.status(200).json({status:0,message:'server error'})
     }
     else
     {
          if(result.length==1)
          {
            res.status(200).json({status:1,message:'user Added Successfully',data:result});

          }
          else
          {
              pool.query("insert into usersdata(mobileno) values(?)",[req.body.mobileno],function(err,reslt){
                
              if(err)
              {
                console.log("errrr",err)
                res.status(200).json({status:0,message:'server error...2'})
              }
              else
              {
                  res.status(200).json({status:2,message:'user Added Successfully',data:[{userid:reslt.insertId,mobileno:req.body.mobileno}]})
              }
               
              })
          }
        
        
     }
 
   }) ;
 });

 router.post('/check_user_address', function(req, res, next) {
  console.log("bodyyyyy",req.body)
   pool.query("select * from useraddress where mobileno=?",[req.body.mobileno],function(error,result){
     if(error)
     {
         console.log("ERRORxxxxxxxxxxx"+error)
         res.status(200).json({status:0,message:'server error'})
     }
     else
     {
          if(result.length==0)
          {
            console.log("hello")
            res.status(200).json({status:false});

          }
          else
          {
            console.log("resultttt",req.body)
             res.status(200).json({status:true,data:result});
          }              
     }
 
   }) ;
 });

 router.post('/add_user_address', function(req, res, next) {
  // console.log("body",req.body)
   
   pool.query("insert into useraddress (userid, mobileno, fullname, state, city, zipcode, address) values(?,?,?,?,?,?,?)",[req.body.userid,req.body.mobileno,req.body.fullname,req.body.state,req.body.city,req.body.zipcode,req.body.address],function(error,result){
     
     if(error)
     {
         console.log("ERRORxxxxxxxxxxx"+error)
         res.status(200).json({status:0,message:'server error'})
     }
     else
     {
       res.status(200).json({status:true,message:'address submitted successfully'})   
     }
 
   }) ;
 });


 


module.exports = router;
