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