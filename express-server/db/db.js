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
// exports.obj = obj

