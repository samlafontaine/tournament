"use client";

import { useState } from "react";
import Header from "./header";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import MatchForm from "./form";

const matchSchema = z.object({
  team1: z.string(),
  team2: z.string(),
  score1: z.coerce.number(),
  score2: z.coerce.number(),
  date: z.date(),
});

type Match = {
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  date: Date;
};

export default function Home() {
  const [list, setList] = useState<Match[]>([]);
  const [selectedValue, setSelectedValue] = useState("matches");

  const handleToggleChange = (value: string) => {
    setSelectedValue(value);
  };

  function onSubmit(values: z.infer<typeof matchSchema>) {
    setList((prevList) => [...prevList, values]);
    console.log(values);
  }

  const sortedList = list.sort(function (a, b) {
    let dateA = new Date(a.date).getTime();
    let dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  // Number of games played

  function countOccurrences(arr: Match[], targetTeam: string): number {
    let count = 0;

    arr.forEach((match) => {
      if (match.team1 === targetTeam || match.team2 === targetTeam) {
        count++;
      }
    });

    return count;
  }

  // Number of wins
  function countWins(arr: Match[], targetTeam: string): number {
    let count = 0;

    arr.forEach((match) => {
      if (
        (match.team1 === targetTeam && match.score1 > match.score2) ||
        (match.team2 === targetTeam && match.score2 > match.score1)
      ) {
        count++;
      }
    });

    return count;
  }

  // Number of losses
  function countLosses(arr: Match[], targetTeam: string): number {
    let count = 0;

    arr.forEach((match) => {
      if (
        (match.team1 === targetTeam && match.score1 < match.score2) ||
        (match.team2 === targetTeam && match.score2 < match.score1)
      ) {
        count++;
      }
    });

    return count;
  }

  // Number of ties
  function countTies(arr: Match[], targetTeam: string): number {
    let count = 0;

    arr.forEach((match) => {
      if (
        (match.team1 === targetTeam && match.score1 == match.score2) ||
        (match.team2 === targetTeam && match.score2 == match.score1)
      ) {
        count++;
      }
    });

    return count;
  }

  // Number of points
  function countPoints(arr: Match[], targetTeam: string): number {
    const wins = countWins(arr, targetTeam);
    const ties = countTies(arr, targetTeam);
    return wins * 2 + ties;
  }

  const teams = [
    "Yellow",
    "Red",
    "Blue",
    "Green",
    "Orange",
    "Purple",
    "Pink",
    "Cyan",
  ];

  const sortedTeams = teams.sort(function (a, b) {
    let teamAPoints = countPoints(list, a);
    let teamBPoints = countPoints(list, b);
    let teamAGamesPlayed = countOccurrences(list, a);
    let teamBGamesPlayed = countOccurrences(list, b);

    if (teamBPoints !== teamAPoints) {
      return teamBPoints - teamAPoints;
    } else return teamBGamesPlayed - teamAGamesPlayed;
  });

  return (
    <main className="min-h-screen p-5 md:p-24 flex flex-col items-center">
      <div className="flex flex-col w-full md:w-6/12">
        <Header />
        <div className="flex flex-row justify-between mb-4">
          <div>
            <ToggleGroup
              type="single"
              defaultValue="matches"
              value={selectedValue}
              onValueChange={handleToggleChange}
            >
              <ToggleGroupItem value="matches">Recent matches</ToggleGroupItem>
              <ToggleGroupItem value="rankings">Rankings</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <PlusIcon className="h-4 w-4 mr-1" />
                New match
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add match</DialogTitle>
                <DialogDescription>Add recently played match</DialogDescription>
              </DialogHeader>
              <MatchForm onSubmit={onSubmit} />
            </DialogContent>
          </Dialog>
        </div>
        {selectedValue === "matches" ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedList.map((item, index) => (
                <TableRow key={index}>
                  <TableCell> {format(item.date, "PPP")}</TableCell>
                  <TableCell className="flex flex-row items-center gap-3">
                    <div className="flex flex-row items-center gap-2">
                      {item.score1 > item.score2 ? (
                        <span className="text-zinc-900 font-medium">
                          {item.team1}
                        </span>
                      ) : (
                        <span className="text-zinc-500">{item.team1}</span>
                      )}
                      <span className="p-1 bg-zinc-100 text-zinc-900 rounded">
                        {item.score1}
                      </span>
                    </div>
                    <div>–</div>
                    <div className="flex flex-row items-center gap-2">
                      <span className="p-1 bg-zinc-100 text-zinc-900 rounded">
                        {item.score2}
                      </span>
                      {item.score2 > item.score1 ? (
                        <span className="text-zinc-900 font-medium">
                          {item.team2}
                        </span>
                      ) : (
                        <span className="text-zinc-500">{item.team2}</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableCaption>General rankings</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Team</TableHead>
                <TableHead>GP</TableHead>
                <TableHead>Wins</TableHead>
                <TableHead>Losses</TableHead>
                <TableHead>Ties</TableHead>
                <TableHead>Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTeams.map((team) => (
                <TableRow key={team}>
                  <TableCell className="font-medium">{team}</TableCell>
                  <TableCell>{countOccurrences(list, team)}</TableCell>
                  <TableCell>{countWins(list, team)}</TableCell>
                  <TableCell>{countLosses(list, team)}</TableCell>
                  <TableCell>{countTies(list, team)}</TableCell>
                  <TableCell>{countPoints(list, team)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </main>
  );
}
