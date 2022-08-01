var jwt=require('jsonwebtoken')
function validateToken(req,res,next){
     //get the token from req headers
    var token= req.headers.authorization
    if(token){
        jwt.verify(token,'appToken',function(e,s){
            if(e){
                res.send('Invalid token')
            }else{
                next()
            }
        })
    }else{
        res.send('Token missing')
    }
}

module.exports=validateToken