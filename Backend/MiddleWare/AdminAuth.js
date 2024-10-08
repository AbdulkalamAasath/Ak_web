const jwt = require('jsonwebtoken')
const User = require('../Modules/AdminModule')
const AdminAuth = async (req,res,next) =>
{
const {authorization} = req.headers
if(!authorization)
{
    res.status(401).json({error:"invalid Authorization"})
}
const token = authorization.split(' ')[1]
try{
    const {_id} = jwt.verify(token,'Ak$Admin')
    req.Admin = await User.findOne({_id}).select('_id')
    next()
}
catch(error){
console.log(error)
res.status(401).json({error:"Authorization Required"})
}
} 
module.exports = AdminAuth