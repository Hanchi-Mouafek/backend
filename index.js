const express=require("express")
const users=require("./routes/users")
require('dotenv').config()
const port=process.env.Port||4002
const app=express()
app.use(cors())
app.use(express.json())

app.use('user',users)
app.use('restaurent',restaurents)


app.listen(port,()=>{
    console.log("app running on port :"+port)
})