import {Router} from "express";
import {create, deletePost, getAllPostsWithDetails ,getPostsWithCommentCount} from "./post.service.js";

const postRouter = Router();

//B- Post APIs
//1. Create new Post(using new instance and save)(Getthepostdatafromthebody
//URL:POST/posts
postRouter.post("/", async (req,res)=>{
   try{
    const result = await (create(req.body));
    res.status(201).json({msg:" created successfully",data:result});
   }
   catch(err){
    return res.status(400).json({message:err.message});
   }
});



//2. Delete a post by its ID (Ensure that only the owner of the post can perform this action)
// URL:DELETE/posts/:postId
postRouter.delete("/:postId", async (req,res)=>{
   try{
    const result = await (deletePost(req.params.postId, req.body.userId));
    res.status(200).json({msg:" Post deleted",data:result});
   }
   catch(err){
       res.status(400).json({message:err.message});
    }
  
});



//3. Retrieve all posts,including the details of the user who created each post and the associated comments.(Show
//only for the post the “id, title”, and for user “id, name”, and for the comments“id, content”) 
// URL:GET/posts/details
postRouter.get("/details", async (req,res)=>{
    try{
        const result = await getAllPostsWithDetails();
        res.status(200).json({msg:"Posts retrieved", data:result});
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
});



//4. Retrieve all posts and count the number of comments associated with each post. 
    // URL:GET/posts/comment-count
postRouter.get("/comment-count", async (req, res) => {
    try {
        const result = await getPostsWithCommentCount();
        res.status(200).json({ msg: "Posts retrieved", data: result });
    } 
    catch (err) {
        res.status(400).json({ message: err.message });
    }          
});

export default postRouter;