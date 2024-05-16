import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface AddTeamProps {
  open: boolean;
  onClose: () => void;
  onAddTeam: (team: string) => void;
}

const AddTeam: React.FC<AddTeamProps> = ({ open, onClose, onAddTeam }) => {
  const [newTeam, setNewTeam] = useState("");

  const handleAddTeam = () => {
    if (newTeam.trim() !== "") {
      onAddTeam(newTeam.trim());
      setNewTeam("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add team</DialogTitle>
          <DialogDescription>Add a new team</DialogDescription>
        </DialogHeader>
        <div className="flex flex-row gap-2">
          <Input
            type="text"
            placeholder="Enter team name"
            value={newTeam}
            onChange={(e) => setNewTeam(e.target.value)}
          />
          <Button onClick={handleAddTeam}>Add Team</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeam;
