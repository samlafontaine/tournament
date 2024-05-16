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

export default function RankingsTableEmpty() {
  return (
    <Table>
      <TableCaption>No team yet. Start by adding a team.</TableCaption>
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
      <TableBody></TableBody>
    </Table>
  );
}
