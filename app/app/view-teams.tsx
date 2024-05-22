import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import TeamsList from "./teams";

interface ViewTeamsDialogProps {
  open: boolean;
  onClose: () => void;
  teams: string[];
}

const ViewTeamsDialog: React.FC<ViewTeamsDialogProps> = ({
  open,
  onClose,
  teams,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Teams</DialogTitle>
          <DialogDescription>
            Here is the list of teams participating in the tournament.
          </DialogDescription>
          <DialogClose onClick={onClose} />
        </DialogHeader>
        <TeamsList teams={teams} />
      </DialogContent>
    </Dialog>
  );
};

export default ViewTeamsDialog;
