import { Response, Request } from "express";
import query from "./db";

const getAllMatch = async (res: Response) => {
  try {
    const games = await query("SELECT * FROM games");
    return res.status(200).json(games.rows);
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
