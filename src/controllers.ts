import { Request, Response } from "express";
import query from "./db";
import { TGames } from "./types";

const getAllMatch = async (req: Request, res: Response) => {
  try {
    const resultGames = await query(`
  SELECT
    g.date,
    g.championship,
    t1.name AS team_1_name,
    t1.img AS team_1_img,
    t2.name AS team_2_name,
    t2.img AS team_2_img,

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
    t1.img,
    t2.name,
    t2.img
`);

    const dataGame: TGames[] = resultGames.rows;
    return res.status(200).json(dataGame);
    // return []
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(401).json({ "Error fetching match:": error });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getOneMatchById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rowCount, rows } = await query("SELECT * FROM games WHERE id = $1", [
    id,
  ]);

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid match ID" });
  }

  if (rowCount === 0) {
    return res.status(404).json({ message: "match not found" });
  }

  return res.status(200).json(rows[0]);
};

export { getAllMatch, getOneMatchById };
