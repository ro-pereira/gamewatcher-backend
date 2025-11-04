"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneMatch = exports.getAllMatch = void 0;
const db_1 = __importDefault(require("./db"));
const getAllMatch = (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = yield (0, db_1.default)("SELECT * FROM games");
        return res.status(200).json(games.rows);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(401).json({ "Error fetching match:": error });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getAllMatch = getAllMatch;
const getOneMatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { rowCount, rows } = yield (0, db_1.default)("SELECT * FROM games WHERE id = $1", [
        id,
    ]);
    if (isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid match ID" });
    }
    if (rowCount === 0) {
        return res.status(404).json({ message: "match not found" });
    }
    return res.status(200).json(rows[0]);
});
exports.getOneMatch = getOneMatch;
