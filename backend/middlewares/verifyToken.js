// verifyToken.js

import jwt from 'jsonwebtoken'
const {verify}=jwt

export const verifyToken=(...allowedRoles) => { //verifyToken("STUDENT","ADMIN")
    return (req,res,next) => {
        try{
    //get token from cookie
    const token=req.cookies?.token //{token : asafghd}
    //check token existed or not
    if(!token)
        return res.status(401).json({message:"Please login first"})
    //validate token(decode rge token)
    let decodedToken=verify(token,process.env.SECRET_KEY)
    //check the role middleware recieved is same as role in decodedToken
    if(!allowedRoles.includes(decodedToken.role))
        return res.status(403).json({message:"You are not authorized"}) //status(403) -- forbidden
    //add decoded token
    req.user=decodedToken
    next()
}catch(err){
    res.status(401).json({message:"Invalid token"})
}
}}
