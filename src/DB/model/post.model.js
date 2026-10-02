import { DataTypes , Model} from "sequelize";
import {sequelize} from "../connection.db.js";
import userModel from "./user.model.js";

class Post extends Model {}

Post.init(
  {
      id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
        type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false,
    }
  },
  {
    sequelize, 
    modelName: 'Post', 
    timestamps:true,
    paranoid: true,
      },
  
);
userModel.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(userModel, { foreignKey: 'userId' });

export default Post;