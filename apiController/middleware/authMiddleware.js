const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next){
    const bearerHeader = req.headers["authorization"];
    if(!bearerHeader || !bearerHeader.startsWith("Bearer ")){
        return res.status(403).json({success: false, message: "authorization failed: token not found"});
    }

    const token = bearerHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    }
    catch(err){
        return res.status(401).json({success: false, message: "invalid token"});
    }
}

module.exports = verifyToken;