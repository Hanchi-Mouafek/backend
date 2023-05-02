const {SignIn,SignUp} =require("../../modules/restaurents/index")
const bcrypt=require("bcryptjs")
const jwt = require('jsonwebtoken');


const signin=(req,res)=>{
    const email=req.body.email
    const password=req.body.password
    console.log(req.body);
    if (!email || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
    SignIn(email,(error,results)=>{
        if(error){
        console.log(error);
        }else{
            if(results.length==0){
              return  res.status(404).json({message: "user undefined"})
            }else{
                const hached=results[0]["restaurentPassword"]
                console.log(hached);
                let result =bcrypt.compareSync(password,hached)
                console.log(result);
                    if(result){
                        let accessToken = jwt.sign({
                            data: results[0].idRestaurent
                          },process.env.JWT_SECERT, { expiresIn: 60 * 60 });
                      
                          res.cookie('token', accessToken , { httpOnly: true });
                         return res.status(200).send("User successfully logged in");
                    }else{
                        return res.status(208).json({message: "Invalid Login. Check username and password"});
                    }
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
    const restaurentRates=req.body.restaurentRates
    const restaurentsMatricule=req.body.restaurentsMatricule
    const restaurentsStatus=req.body.restaurentsStatus
    var salt = bcrypt.genSaltSync(10);
    var restaurentPassword = bcrypt.hashSync(password, salt);

    console.log(req.body,restaurentPassword);
    const restaurent_data=[restaurentName , restaurentAddress ,restaurentNumber, restaurentImage , restaurentDescription , restaurentSpecialite , restaurentMenu , restaurentTiming , restaurentEmail , restaurentPassword , restaurentRates , restaurentsMatricule , restaurentsStatus]
    console.log(restaurent_data);
    if (!email || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
    SignIn(email,(error,results)=>{
        if(error!=undefined){
        console.log(error);
        }else{
            if(results.length>0){
                return res.status(404).json({message: "User already exists!"}); 
            }else{
            SignUp(restaurent_data,(err,results)=>{
                if(err){
                    console.log(err);
                }else { 
                    console.log(results);
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