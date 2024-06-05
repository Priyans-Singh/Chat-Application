import User from "../models/userSchema.js";

export const getUserController = async (req,res) =>{
    try {
    
        const userId = req.user._id;

        const filteredUser = await User.find({ _id:{ $ne: userId } }).select('-password');
        
        res.status(200).json(filteredUser);

    } catch (error) {
        console.log("Error in getUser controller",error.message);
        res.status(500).json({error:'Internal Server Error'});
    }
}