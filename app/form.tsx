"use client";

import { z } from "zod";

export const matchSchema = z.object({
  team1: z.string().min(2).max(50),
  team2: z.string().min(2).max(50),
  score1: z.number(),
  score2: z.number(),
  date: z.date(),
});

export type Match = z.infer<typeof matchSchema>;
