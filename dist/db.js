"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.environment = process.env.NODE_ENV;
console.log(process.env.DB_USER, "HERE");
const pool = new pg_1.Pool({
    user: String(process.env.DB_USER) || '',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || '',
    password: String(process.env.DB_PASSWORD) || '',
    port: Number(process.env.PORT) || 5433,
});
exports.default = pool;
// DB_HOST=localhost
// DB_NAME=sports_schedule
// DB_USER=postgres
// DB_PASSWORD=postgree
// DB_PORT=5433
