import { DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";

const userModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        CheckPasswordLength(value) {
          if (value.length < 6) {
            throw new Error("Password must be at least 6 characters");
          }
        },
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
    },
  },
  {
    timestamps: true,
   
    hooks: {
      beforeCreate: (user) => {
        if (user.name.length < 2) {
          throw new error("The name must be at least 2 characters");
        }
      },
    },
  },
);

export default userModel;
