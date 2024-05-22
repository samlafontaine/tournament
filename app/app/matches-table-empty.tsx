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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddTeam from "./add-team";
import MatchForm from "./form";
import { z } from "zod";

interface MatchesTableEmptyProps {
  onAddTeam: (newTeam: string) => void;
  teams: string[];
  onSubmit: (values: z.infer<typeof matchSchema>) => void;
}

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

const MatchesTableEmpty: React.FC<MatchesTableEmptyProps> = ({
  onAddTeam,
  teams,
  onSubmit,
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
          No match yet. Start by{" "}
          <Dialog>
            <DialogTrigger className="underline font-medium cursor-pointer hover:decoration-2">
              adding a match
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add match</DialogTitle>
                <DialogDescription>Add recently played match</DialogDescription>
              </DialogHeader>
              <MatchForm onSubmit={onSubmit} teams={teams} />
            </DialogContent>
          </Dialog>
          . If you have no teams yet,{" "}
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
