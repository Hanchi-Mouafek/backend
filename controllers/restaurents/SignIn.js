const signIn =require("../../modules/restaurents/SignIn")

const signin=async(req,res)=>{
await signIn(req)
res.status(200).json("hi")
}
module.exports=signin