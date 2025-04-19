const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authUser = async (req, res, next) =>{
    const {authorization } = req.headers;

    if(!authorization){
        return res.status(401).json({error: "Auth token is required!"});
    }

    // split to get token
    const token = authorization.split(" ")[1];
    try {
        const {id} =  jwt.verify(token, process.env.JWT_SECRET);
        // console.log(id);
        req.user = await userModel.findOne({_id: id});
        // console.log(req.user);
        next();
    } 
    catch (error) {
        res.status(401).json({error: "Request is not authorised!"});
    }
} 

module.exports = authUser