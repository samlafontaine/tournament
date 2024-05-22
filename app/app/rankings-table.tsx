// components/RankingsTable.tsx

import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableHeader,
} from "@/components/ui/table";
import { Match } from "@/app/app/types/matches";

interface RankingsTableProps {
  sortedTeams: string[];
  list: Match[]; // Add the list prop
  countOccurrences: (arr: Match[], team: string) => number;
  countWins: (arr: Match[], team: string) => number;
  countLosses: (arr: Match[], team: string) => number;
  countTies: (arr: Match[], team: string) => number;
  countPoints: (arr: Match[], team: string) => number;
}

const RankingsTable: React.FC<RankingsTableProps> = ({
  sortedTeams,
  list,
  countOccurrences,
  countWins,
  countLosses,
  countTies,
  countPoints,
}) => {
  return (
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
  );
};

export default RankingsTable;
