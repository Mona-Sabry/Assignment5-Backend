import dotenv from "dotenv";
import path from "node:path";
dotenv.config({ path: process.env.NODE_ENV === "prod"? path.resolve("./.env.prod"): path.resolve("./.env.dev") });

export const PORT = Number(process.env.PORT) || 3000;
export const USER_NAME = process.env.USER_NAME || "user";
export const USER_PASSWORD = process.env.USER_PASSWORD || "123";

export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_HOST = process.env.DB_HOST|| "localhost";
export const DB_NAME = process.env.DB_NAME || "sequelizedb";
export const DB_ENGIN = process.env.DB_ENGIN || "mysql";
