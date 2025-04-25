const checkAdmin = (req,res,next) =>{
const {role} = req.user;
if(role=="user"){
   return res.status(400).json({message:"you are not admin"})
}

next()





}

module.exports=checkAdmin