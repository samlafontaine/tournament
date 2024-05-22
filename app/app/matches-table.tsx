import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Match } from "@/app/app/types/matches";

interface MatchTableProps {
  sortedList: Match[]; // Assuming you have defined Match type somewhere
}

const MatchTable: React.FC<MatchTableProps> = ({ sortedList }) => {
  return (
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
  );
};

export default MatchTable;
