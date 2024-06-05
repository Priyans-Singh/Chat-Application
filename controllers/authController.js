import User from "../models/userSchema.js";
import bcrypt from 'bcryptjs';
import generateToken from "../generateJWT.js";

export const login = async (req,res) =>{
   try {
      const {userName,password} = req.body;
      const user = await User.findOne({userName});
      const isPassword = await bcrypt.compare(password,user?.password || "");
      if(!user || !isPassword)
         {
            return res.status(400).json({error:"Username or Password is invalid"});
         }
      
      generateToken(user._id,res);
      
      res.status(200).json({
         id: user._id,
         fullName: user.name,
         userName: user.userName
      });
      
   } catch (error) {
      console.log("Error in login controller",error.message);
      res.status(500).json({error:'Internal Server Error'});
   }
};

export const logout = async (req,res) =>{
   try {
      res.clearCookie('token');
      res.status(200).json({message:'Logged out successfully'});
      
   } catch (error) {
      console.log("Error in logout controller",error.message);
      res.status(500).json({error:'Internal Server Error'});
   }
};

export const signup = async (req,res) =>{
   try {
      const {userName, password, confirmPassword, gender, name} = req.body;
      
      //checking if passwords are same
      if(password !== confirmPassword)
         return res.status(400).json({error:'Password do not match'});
      
      //checking if user already exists or not
      const user = await User.findOne({userName});
      if(user)
         return res.status(400).json({error:'Username already exists'});

      //passes all the checks so now we hash the password
      const salt =  await bcrypt.genSalt(10); 
      const hashedPassword = await bcrypt.hash(password,salt);

      const newUser = new User({
         name,
         userName,
         password:hashedPassword,
         gender,
      });
      
      //generating token and saving user
      generateToken(newUser._id,res);
      await newUser.save();

      res.status(200).json({
         id: newUser._id,
         fullName: newUser.name,
         userName: newUser.userName,
         password: newUser.password,
         gender: newUser.gender
      });

    } catch (error) {
      console.log("Error in signup controller",error.message);
      res.status(500).json({error:'Internal Server Error'});  
   }
};