const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) =>{
    const authHeader = req.headers.token

    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SEC, (err,user)=>{
            if(err) res.status(403).json("Token is not Valid")
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("your are not authorised")
    }
}

const verifyTokenAndAuth = (req, res, next) =>{
    verifyToken(req, res, ()=>{
        if(req.body.userId === req.params.id){
            next();
        }else{
            res.status(403).json("changes not allowed")
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) =>{
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("not allowed")
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin}; 