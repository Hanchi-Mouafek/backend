const connection=require("../../config")


const SignIn=(email,callback)=>{

    const sql=`SELECT * FROM restaurents WHERE restaurentEmail LIKE ?`
    const searchQuery = `%${email}%`;
    connection.query(sql, [searchQuery], (error, results) => {
      callback(error,results)
    });
   
}
const SignUp=(arrayRes,callback)=>{
  const sql=`INSERT INTO restaurents (restaurentName , restaurentAddress ,restaurentNumber, restaurentImage , restaurentDescription , restaurentSpecialite , restaurentMenu , restaurentTiming , restaurentEmail , restaurentPassword , restaurentRates , restaurentsMatricule , restaurentsStatus) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`
  connection.query(sql,arrayRes,(error,results)=>{
    callback(error,results)
  })

}




module.exports={
  SignIn,
  SignUp
}