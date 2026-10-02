import Comment from "../../DB/model/comment.model.js";
import userModel from "../../DB/model/user.model.js";
import Post from "../../DB/model/post.model.js";
import {Op} from "sequelize";


export async function create(commentData){
    const comment = new Comment(commentData);
    await comment.save();
    return comment;
};


export async function updateComment(id , userId , content){
    const comment = await Comment.findByPk(id);
    if(!comment){
        throw new Error ("comment not found");
    }
    if(comment.userId !== Number(userId)){
        throw new Error("You are not authorized to update this comment.");
    }
    comment.content = content;
    await comment.save();
    return comment;
};


export async function findOrCreateComment(postId , userId , content){
     const [ comment , created] = await Comment.findOrCreate({
         where:{postId , userId , content},
        defaults:{postId , userId , content},
     })
        return comment;
};


export async function findAllCommentsContainWord(word) {
  const result = await Comment.findAndCountAll({
    where: {
      content: {
        [Op.like]: `%${word}%`
      }
    }
  });

  return {
    comments: result.rows,
    count: result.count
  };
};


export async function getNewestCommentsForPost(postId){
    const comments = await Comment.findAll({
        where: {
            postId: postId
        },
        order: [
            ['createdAt', 'DESC']
        ],
        limit: 3
    });
    return comments;
};


export async function getCommentDetails(id){
    const comment = await Comment.findAll({
        where:{id},
        include:[
            {
                model:userModel,
                attributes:["id", "name" , "email"]
            },
            {
                model:Post,
                attributes:["id","title","content"]
            }
        ],
        
    });
    return comment;
}