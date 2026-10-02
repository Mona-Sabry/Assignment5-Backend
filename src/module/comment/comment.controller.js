import { Router } from "express";
import {
  create,
  findAllCommentsContainWord,
  findOrCreateComment,
  getCommentDetails,
  getNewestCommentsForPost,
  updateComment,
} from "./comment.service.js";

const commentRouter = Router();

//C- Comment APIs:
//1. Create a bulk of Comments.
// URL:POST/comments
commentRouter.post("/", async (req, res) => {
  try {
    const result = await create(req.body);
    res.status(201).json({ msg: "Comments created", data: result });
  } catch (error) {
    res
      .status(400)
      .json({ msg: "Error creating comments", error: error.message });
  }
});

//2. Update the content of a specific comment by its ID. (Ensure that only the owner of the comment can perform this action) (The user id that wants to perform this action will be given in the body).
// URL:PATCH/comments/:commentId
// Input from the body: {"userId": 3, "content": "updated"}
commentRouter.patch("/:commentId", async (req, res) => {
  try {
    const result = await updateComment(
      req.params.commentId,
      req.body.userId,
      req.body.content,
    );
    res.status(200).json({ message: "Comment updated", data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//3. find a comment for a specific post,user,and content.If the comment exists,return it,otherwise,create a new
// comment with the given details
// URL:POST/comments/find-or-create
commentRouter.post("/find-or-create", async (req, res) => {
  try {
    const result = req.body;
    const comment = await findOrCreateComment(
      result.postId,
      result.userId,
      result.content,
    );
    res
      .status(200)
      .json({ message: "Comment found or created", data: comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//4. Retrieve all comments that contain a specific word in their content and return the number of comments matched
//(use find and count).
// URL:GET/comments/search=>(forexample/comments/search?word=the)
commentRouter.get("/search", async (req, res) => {
  try {
    const { word } = req.query;
    const comment = await findAllCommentsContainWord(word);
    res.status(200).json({ message: "Comment found", data: comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//5. Retrieve the 3 most recent comments for a specific post,ordered by creation date.
// URL:GET/comments/newest/:postId
commentRouter.get("/newest/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await getNewestCommentsForPost(postId);
    res.status(200).json({ message: "Newest comments found", data: comments });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//6. Get Specific Comment By PK with User and Post Information.
// URL:GET/comments/details/:id
commentRouter.get("/details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await getCommentDetails(id);
    res.status(200).json({ message: "No comment found", data: comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default commentRouter;
