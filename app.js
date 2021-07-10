const express=require('express')
const app=express()
const auth=require('./router/auth')
const model=require('./router/model')
const morgan=require('morgan')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const path = require('path');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './dist')));
app.use(express.static(path.join(__dirname, './src/assets')));

app.use(cookieParser());
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use('/auth',auth)
app.use('/',model)

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './build/index.html'));
});

app.listen(5000,()=>{
    console.log('server is listening on port 5000...')
})