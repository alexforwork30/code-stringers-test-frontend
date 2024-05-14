import dotenv from "dotenv";

dotenv.config();

export const BE_URL = process.env?.BE_URL || "http://localhost:3001";
