import { Pool, QueryResult } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const environment = process.env.NODE_ENV;

const pool = new Pool({
  user: String(process.env.DB_USER) || "",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "",
  password: String(process.env.DB_PASSWORD) || "",
  port: Number(process.env.DB_PORT) || 5433,
});

const query = (text: string, params?: any[]): Promise<QueryResult<any>> => {
  return pool.query(text, params);
};

export default query;
