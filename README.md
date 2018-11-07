#### express  node-modules太大，删了，自行npm install

#### sever简单路由，简单请求返回 index.html

```
const express = require('express')
const app = express()

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())
app.use(urlencodedParser)


app.get('/',(req,res)=>{
    res.send('home')
})
app.post('/form',(req,res,next)=>{
    console.log(req.body.sex)   
    res.send('sex:'+req.body.sex)
})
app.get('/home/1234',(req,res,next)=>{
    res.send('home-')
    next()
})
app.get('/home/:name',(req,res)=>{
    res.send(req.params.name)
})


app.listen(8085)
```



#### express-sever 使用了express+nodeJs+mongoose,以及中间件使用，对post/get两种请求方式，参数操作，对数据库操作 login.html 





```
const mongoose = require('mongoose')

//handle 

const Schema  = mongoose.Schema

//connect db

mongoose.connect('mongodb://localhost:27017/user')// ### 后面的是database name,并不是连接名字

const db = mongoose.connection

//connect error

db.on('error',()=>{

    console.log('hava a error')

})

//connected

db.on('connected',()=>{

    console.log('connected')

})

 

//collect 

const userInfoSchema = new Schema({

    name:String,

    sex:String,

    age:Number,

    password:String

})

 

//

const userInfoModel = mongoose.model('user',userInfoSchema)

 

// console.log(findFun({name:'looop'}))

 

//查询全部{},客户端关键fliter,防止数据库注入

function findFun(col={}){ 

    //查询条件有才find,保证数据安全

    if(col){

        userInfoModel.find(col,(err,userDate)=>{

            if(err){

                console.log(err)//error优先

            }else{

                return userDate

            }

        })

    }else{

        console.log('请输入查询条件')

    }

}

 

 

// removeFun(),删除

function removeFun(col={}){

    if(col){

        userInfoModel.remove(col,(err,successDate)=>{

            if(err){

                console.log(err)

            }else{

                return successDate

            }

        })

    }else{

        console.log('输入要删除的条件')

    }

}

 

//update

 

const updateFun = (id={},col={})=>{

    if(col){

        userInfoModel.findByIdAndUpdate(id,col,(err,updateInfo)=>{

            if(err){

                console.log(err)

            }else{

                return updateInfo

            }

        })      

    }

    else{

        console.log('输入更新条件')

    }

}

// updateFun({_id:'5be2d9d505a59d0dd8935048'},{name:'looop'})

 

//insert function

 

const insertFun = (col={})=>{

    if(col){

        const userInfo = new userInfoModel(col)

        userInfo.save((err,insertInfo)=>{

            if(err){

                console.log(err)

            }else{

                return insertInfo

            }

        })

 

    }

}

 

var obj = {

    findFun,

    insertFun,

    updateFun,

    removeFun

}

 

 

exports.userInfoModel = userInfoModel

// exports.obj = obj //异步操作，获取不了值undefined
```

###  index.js

```
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

```

 