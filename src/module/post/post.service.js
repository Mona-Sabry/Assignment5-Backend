import Post from "../../DB/model/post.model.js";
import userModel from "../../DB/model/user.model.js";
import Comment from "../../DB/model/comment.model.js";
import { sequelize } from "../../DB/connection.db.js";

export async function create(postData) {
  const post = new Post(postData);
  await post.save();
  return post;
};


export async function deletePost(id , userId) {
  const post = await Post.findByPk( id );
  if(!post){
    throw new Error("Post not found.");
  }
  if (post.userId !== Number(userId)) {
    throw new Error("You are not authorized to delete this post.");
  }
  await post.destroy();
  return post;
};


export async function getAllPostsWithDetails(){
  const result = await Post.findAll({
            attributes:["id", "title"],
            include:[
                {
                    model : userModel,
                    attributes:["id", "name"]
                },
                {
                    model : Comment,
                    attributes:["id", "content"]
                }
            ]
})
return result;
};


export async function getPostsWithCommentCount() {
  const result = await Post.findAll({
    attributes: [
      "id",
      "title",
      [
        sequelize.fn(
          "COUNT",
          sequelize.col("Comments.id")
        ),
        "commentCount"
      ]
    ],

    include: [
      {
        model: Comment,
        attributes: []
      }
    ],

    group: ["Post.id"]
  });

  return result;
}

