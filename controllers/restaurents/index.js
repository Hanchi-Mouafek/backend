const {SignIn,SignUp} =require("../../modules/restaurents/index")
const bcrypt=require("bcrypt")
const jwt = require('jsonwebtoken');


const signin=(req,res)=>{
    const email=req.body.email
    const password=req.body.password
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
    SignIn(email,(error,results)=>{
        if(error){
        return   res.status(505).json({message: "server error"})
        }else{
            if(results.length==0){
              return  res.status(404).json({message: "user undefined"})
            }else{
                const hached=results[0].restaurentPassword
                bcrypt.compareSync(password,hached,(err,result)=>{
                 if(err){
                   return  res.status(505).json({message: "server error"})
                 }else {
                    if(result){
                        let accessToken = jwt.sign({
                            data: results[0].idRestaurent
                          },process.emit.JWT_SECERT, { expiresIn: 60 * 60 });
                      
                          res.cookie('token', accessToken , { httpOnly: true });
                         return res.status(200).send("User successfully logged in");
                    }else{
                        return res.status(208).json({message: "Invalid Login. Check username and password"});
                    }
                }
            })
            }
        }
    
    })

}
const signup=(req,res)=>{
    const email=req.body.restaurentEmail
    const password=req.body.restaurentPassword
    const restaurentName =req.body.restaurentName
    const restaurentAddress =req.body.restaurentAddress
    const restaurentNumber =req.body.restaurentNumber
    const restaurentImage=req.body.restaurentImage
    const restaurentDescription=req.body.restaurentDescription
    const restaurentSpecialite=req.body.restaurentSpecialite
    const restaurentMenu=req.body.restaurentMenu
    const restaurentTiming=req.body.restaurentTiming
    const restaurentEmail=req.body.restaurentEmail
    const restaurentPassword=req.body.restaurentPassword
    const restaurentRates=req.body.restaurentRates
    const restaurentsMatricule=req.body.restaurentsMatricule
    const restaurentsStatus=req.body.restaurentsStatus
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
    SignIn(email,(error,results)=>{
        if(error){
        return   res.status(505).json({message: "server error"})
        }else{
            if(results.length>0){
                return res.status(404).json({message: "User already exists!"}); 
            }else{
                bcrypt.hashSync(password, process.env.bcrypt_salt, function(err, hash) {
                    if (err) {
                        return   res.status(505).json({message: "server error"})
                    } else {
                      restaurentPassword=hash
                      console.log(hash); // Store this hash in your database
                    }
                  });
            const restaurent_data=[restaurentName , restaurentAddress ,restaurentNumber, restaurentImage , restaurentDescription , restaurentSpecialite , restaurentMenu , restaurentTiming , restaurentEmail , restaurentPassword , restaurentRates , restaurentsMatricule , restaurentsStatus]
            SignUp(restaurent_data,(err,results)=>{
                if(err){
                    return  res.status(505).json({message: "server error"})
                }else { 
                    return res.status(200).json({message: "User successfully registred. Now you can login"});
                }
                          
            })
            }
        }
    
    })
}
module.exports={
    signin_restaurent:signin,
    signup_restaurent:signup
}