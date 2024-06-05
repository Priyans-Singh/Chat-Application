import User from "./models/userSchema.js";
import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) =>{
   try {
    //getting token from cookie or header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    if(!token)
        return res.status(401).json({error:"No token provided"});

    const decoded = jwt.verify(token ,process.env.JWT_SECRET);
    if(!decoded)
        return res.status(401).json({error:"Invalid Authentication"});

    const user = await User.findById(decoded.userId).select("-password");
    if(!user)
        return res.status(401).json({error:"User did not match"});

    req.user = user;

    next();

   } catch (error) {
    console.log("Error while authenticating", error.message);
    res.status(500).json({error:"Internal Middleware error"});
   }
};

export default authenticate;