import User from "../models/userSchema.js";
import Message from "../models/messageSchema.js";
import Conversation from "../models/conversationSchema.js";

export const sendMessage = async (req,res) =>{
   try {
     
    const recieverId = req.params.id;
    const { message } = req.body;
    const senderId = req.user._id;
    
    let consversation = await Conversation.findOne(
        {participants:{$all:[senderId,recieverId]}}
    );

    if(!consversation)
    {
       consversation = await Conversation.create({
        participants:[senderId, recieverId]
       });
    }

    const newMessage = new Message({
         senderId,
         recieverId,
         message,
    });

    await newMessage.save();

    if(newMessage)
    {
        consversation.messages.push(newMessage._id);
    }

    await consversation.save();

    res.status(200).json({
        senderId,
        recieverId,
        message,
    });

   } catch (error) {
    console.log("Error in sendMessage controller",error.message);
    res.status(500).json({error:'Internal Server Error'});
   }
};

export const getMessage = async (req,res) =>{
    try {
        
    const {id:recieverId} = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
        participants:{$all:[senderId,recieverId]}
    }).populate('messages');
    
    res.status(200).json(conversation.messages);

    } catch (error) {
        console.log("Error in getMessage controller",error.message);
        res.status(500).json({error:'Internal Server Error'});
    }
}