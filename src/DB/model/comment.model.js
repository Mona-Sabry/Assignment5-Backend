import { DataTypes , Model} from "sequelize";
import {sequelize} from "../connection.db.js";
import userModel from "./user.model.js";
import Post from "./post.model.js";

class Comment extends Model {}

Comment.init(
  {
      id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false,
    }
  },
  {
    timestamps:true,
     sequelize, 
    modelName: 'Comment', 
      },
  
);
Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

userModel.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(userModel, { foreignKey: 'userId' });

export default Comment;