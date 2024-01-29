var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer')




/* GET users listing. */
router.post('/add_product_data',upload.single('image'), function(req, res, next) {

  pool.query("insert into products (companyid, categoryid, productname, desctiption, status, treanding, deals, pricetype, image, createdat, updatedat, createdby) values(?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.companyid,req.body.categoryid,req.body.productname,req.body.description,req.body.status,req.body.treanding,req.body.deals,req.body.pricetype,req.file.originalname,req.body.createdat,req.body.updatedat,req.body.createdby],function(error,result){
  if(error)
  {
    res.status(200).json({status:false,message:'server error'})
  }
  else
  {
    res.status(200).json({status:true,message:'data inserted successfully'})

  }

  })
  
});
router.post('/fetch_product_data',function(req,res){

  pool.query("select p.*,(select c.categoryname from category c where c.categoryid=p.categoryid ) as cname   from products p where companyid=? ",[req.body.companyid],function(error,result){

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

module.exports = router;