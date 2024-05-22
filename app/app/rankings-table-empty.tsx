import React from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCaption,
  TableHeader,
} from "@/components/ui/table";
import AddTeam from "./add-team";

interface RankingsTableEmptyProps {
  onAddTeam: (newTeam: string) => void;
  teams: string[];
}

const RankingsTableEmpty: React.FC<RankingsTableEmptyProps> = ({
  onAddTeam,
  teams,
}) => {
  const [isAddTeamDialogOpen, setIsAddTeamDialogOpen] = useState(false);
  const handleAddTeam = (newTeam: string) => {
    onAddTeam(newTeam);
    setIsAddTeamDialogOpen(false);
  };
  return (
    <>
      <Table>
        <TableCaption>
          No team yet. Start by{" "}
          <span
            onClick={() => setIsAddTeamDialogOpen(true)}
            className="underline font-medium cursor-pointer hover:decoration-2"
          >
            adding a team
          </span>
          .
        </TableCaption>
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

      {/* Add Team Dialog */}
      <AddTeam
        open={isAddTeamDialogOpen}
        onClose={() => setIsAddTeamDialogOpen(false)}
        onAddTeam={handleAddTeam}
      />
    </>
  );
};

export default RankingsTableEmpty;
