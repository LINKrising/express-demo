var express = require('express');
var router = express.Router();
var userInfoModel = require('../db/db.js').userInfoModel
const md5 = require('blueimp-md5')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//key info
let filter = {password:0,_v:0}

//get info 1
router.get('/getUserInfo/:name',(req,res)=>{
  let userName = req.params.name
  console.log(userName)
  userInfoModel.find({'name':userName},filter,(err,data)=>{
    console.log(userName)
    if(err){
      console.log('hava a error')
    }else{
     let resDate = {
        code:0,
        data
      }
      res.send(resDate)
    }
  })
})

//getinfo router 2

router.get('/getUserInfo',(req,res)=>{
  let userName = req.query.name
  console.log(userName)
  userInfoModel.find({'name':userName},filter,(err,data)=>{
    console.log(userName)

    if(err){
      console.log('hava a error')
    }else{
     let resDate = {
        code:0,
        data
      }
      res.send(resDate)
    }
  })
})

//login router
router.post('/login',(req,res)=>{
  const {name,password} = req.body
  userInfoModel.find({'name':name,'password':password},filter,(err,data)=>{
    if(err){
      console.log('hava a error')
    }else{
      if(data.length>0){
        let resDate = {
           code:1,
           msg:'用户存在',
           data
         }
         res.send(resDate)
       }else{
         let resDate = {
           code:0,
           msg:'用户不存在'
         }
         res.send(resDate)
       }
    }

  })
})


module.exports = router;
