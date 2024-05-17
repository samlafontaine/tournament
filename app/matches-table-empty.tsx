import React from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableHead,
  TableCaption,
} from "@/components/ui/table";
import AddTeam from "./add-team";

interface MatchesTableEmptyProps {
  onAddTeam: (newTeam: string) => void;
  teams: string[];
}

const MatchesTableEmpty: React.FC<MatchesTableEmptyProps> = ({
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
          No match yet. Start by adding a match. If you have no teams yet,{" "}
          <span
            onClick={() => setIsAddTeamDialogOpen(true)}
            className="underline font-medium cursor-pointer hover:decoration-2"
          >
            add your first team
          </span>
          .
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Score</TableHead>
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

export default MatchesTableEmpty;
