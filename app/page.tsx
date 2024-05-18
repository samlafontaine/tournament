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
import MatchForm from "./form";
import MatchTable from "./matches-table";
import RankingsTable from "./rankings-table";
import SettingsDropdownMenu from "./menu";
import EditName from "./edit-name";
import RankingsTableEmpty from "./rankings-table-empty";
import MatchesTableEmpty from "./matches-table-empty";
import { Footer } from "./footer";

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
  const [tournamentName, setTournamentName] = useState("tournament");
  const [isEditNameDialogOpen, setIsEditNameDialogOpen] = useState(false);

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
        (match.team1 === targetTeam && match.score1 === match.score2) ||
        (match.team2 === targetTeam && match.score2 === match.score1)
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

  const [teams, setTeams] = useState<string[]>([]);

  const handleAddTeam = (newTeam: string) => {
    setTeams([...teams, newTeam]);
  };

  const sortedTeams = teams.sort(function (a, b) {
    let teamAPoints = countPoints(list, a);
    let teamBPoints = countPoints(list, b);
    let teamAGamesPlayed = countOccurrences(list, a);
    let teamBGamesPlayed = countOccurrences(list, b);

    if (teamBPoints !== teamAPoints) {
      return teamBPoints - teamAPoints;
    } else return teamBGamesPlayed - teamAGamesPlayed;
  });

  const handleEditNameSubmit = (values: { name: string }) => {
    setTournamentName(values.name);
    setIsEditNameDialogOpen(false);
  };

  return (
    <>
      <main className="min-h-screen p-5 md:pt-24 flex flex-col items-center">
        <div className="flex flex-col w-full md:w-6/12">
          <div className="mb-12">
            <div className="flex flex-row justify-between">
              <Header tournamentName={tournamentName} />
              <SettingsDropdownMenu
                onOpenEditNameDialog={() => setIsEditNameDialogOpen(true)}
                onAddTeam={handleAddTeam}
                teams={teams}
              />
            </div>
            <p className="text-sm text-zinc-600 leading-relaxed w-5/6">
              Information about the ongoing{" "}
              <span className="lowercase font-medium">{tournamentName}</span>.
              Add and view recently played matches, and see who's currently
              leading in the rankings.
            </p>
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div>
              <ToggleGroup
                type="single"
                defaultValue="matches"
                value={selectedValue}
                onValueChange={handleToggleChange}
              >
                <ToggleGroupItem value="matches">
                  Recent matches
                </ToggleGroupItem>
                <ToggleGroupItem value="rankings">Rankings</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="flex flex-row gap-1">
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
                    <DialogDescription>
                      Add recently played match
                    </DialogDescription>
                  </DialogHeader>
                  <MatchForm onSubmit={onSubmit} teams={teams} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          {selectedValue === "matches" ? (
            list.length > 0 ? (
              <MatchTable sortedList={sortedList} />
            ) : (
              <MatchesTableEmpty
                onAddTeam={handleAddTeam}
                teams={teams}
                onSubmit={onSubmit}
              />
            )
          ) : teams.length > 0 ? (
            <RankingsTable
              sortedTeams={sortedTeams}
              list={sortedList}
              countOccurrences={countOccurrences}
              countWins={countWins}
              countLosses={countLosses}
              countTies={countTies}
              countPoints={countPoints}
            />
          ) : (
            <RankingsTableEmpty onAddTeam={handleAddTeam} teams={teams} />
          )}
        </div>
      </main>

      {/* Edit Name Dialog */}
      <EditName
        open={isEditNameDialogOpen}
        onClose={() => setIsEditNameDialogOpen(false)}
        onSubmit={handleEditNameSubmit}
      />
    </>
  );
}
