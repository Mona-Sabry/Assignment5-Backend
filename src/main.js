import express from "express";
import { PORT } from "./config/config.js";
import { syncDB, testConnection } from "./DB/connection.db.js";
import Comment from "./DB/model/comment.model.js";
import Post from "./DB/model/post.model.js";
import userModel from "./DB/model/user.model.js";
import { globalErrorMiddleware } from "./middleware/error.middleware.js";
import { notFoundMiddleware } from "./middleware/notFoundMiddleware.js";
import commentRouter from "./module/comment/comment.controller.js";
import postRouter from "./module/post/post.controller.js";
import userRouter from "./module/user/user.controller.js";
async function bootstrap() {
  const app = express();

  app.use(express.json());

  await testConnection();

  await syncDB({ alter: false });

  await userModel.sync();
  await Post.sync();
  await Comment.sync();

  app.use("/user", userRouter);
  app.use("/posts", postRouter);
  app.use("/comments", commentRouter);

  app.all("/{*dummy}", notFoundMiddleware);
  app.use(globalErrorMiddleware);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

bootstrap();
