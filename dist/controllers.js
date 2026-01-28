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
exports.getOneMatchById = exports.getAllMatch = void 0;
const db_1 = __importDefault(require("./db"));
// export type TGames = {
//   data: Date;
//   championship: string;
//   team_1_name: string;
//   team_2_name: string;
//   channels: string[];
// };
const getAllMatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultGames = yield (0, db_1.default)(`
  SELECT
    g.date,
    g.championship,
    t1.name AS team_1_name,
    t2.name AS team_2_name,
    ARRAY_AGG(c.name) AS channels
  FROM games g
  JOIN teams t1 ON t1.id = g.team_1_id
  JOIN teams t2 ON t2.id = g.team_2_id
  JOIN channels_games cg ON cg.game_id = g.id
  JOIN channels c ON c.id = cg.channel_id
  GROUP BY
    g.id,
    g.date,
    g.championship,
    t1.name,
    t2.name
`);
        const dataGame = resultGames.rows;
        return res.status(200).json(dataGame);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(401).json({ "Error fetching match:": error });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getAllMatch = getAllMatch;
const getOneMatchById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.getOneMatchById = getOneMatchById;
