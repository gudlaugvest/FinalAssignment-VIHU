import type { NextApiRequest, NextApiResponse } from "next";
import { createGame } from "../../lib/gameStore";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function newGame(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { playerName, secondPlayerName } = req.body;

    const game = await prisma.game.create({
      data: {
        player1_name: playerName,
        player2_name: secondPlayerName,
        moves: [],
      },
    });

    return res.status(200).json(game);
  } catch (error) {
    console.error("Error creating game:", error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
}
