import {Router} from "express";
import { signup , update , findUser , getUser} from "./user.service.js";

const userRouter = Router();


//A- UserAPIs
// 1. Create a new user(using build and save)(makesure that the email does not exist before)(Don’t forget to Handle
// validation errors). 
//URL:POST/users/signup
userRouter.post("/signup",async (req,res)=>{
    try{
    const result = await signup(req.body);
     res.status(201).json({msg:"User added successfully", data:result});
    }
    
    catch(err){
       if(err.name === "SequelizeUniqueConstraintError"){
        return res.status(400).json({message:"Email already exists"});
       }
        if(err.name === "SequelizeValidationError"){
        return res.status(400).json({message:err.errors.map(error=>error.message)});
       }
       res.status(500).json({message:"Something went wrong"});
    }
   
});


//2. Create or update based on PK and use skip validation option.
//URL:PUT/users/:id
userRouter.put("/:id",async (req,res)=>{
    try{
    const result = await update(req.params.id ,req.body);
     res.status(200).json({msg:"User created or updated successfully", data:result});
    }
    
    catch(err){
        return res.status(400).json({message:err.message});
    }
   
});


//3. Write an API end point to find a user by their email address.
//URL:GET/users/by-email(forexample/user/by-email?email=user1@gmail.com)
userRouter.get("/by-email",async (req,res)=>{
    try{
    const result = await findUser(req.query.email);
     res.status(200).json({data:result});
    }
    
    catch(err){
        return res.status(400).json({message:"No user found"});
    }
   
});


//4. Retrieve a user by their PK,excluding the “role” field from the response. 
//URL:GET/user/:id
userRouter.get("/:id", async (req,res ,next)=>{
    try{
    const {id} = req.params;
    const result = await getUser(id);
    res.status(200).json({msg:"User retrieved successfully", data:result});
    }
    catch(error){
 next (error);
    };
    
});


export default userRouter;