const express=require("express")
// const users=require("./routes/users")
const restaurents=require('./routes/restaurents')
const cookieParser = require('cookie-parser');
const cors=require('cors')


require('dotenv').config()
const port=process.env.Port||4002



const app=express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
// app.use('user',users)
app.use('restaurent',restaurents)


app.listen(port,()=>{
    console.log("app running on port :"+port)
})