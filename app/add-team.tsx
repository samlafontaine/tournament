import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

interface AddTeamProps {
  onAddTeam: (team: string) => void;
}

const AddTeam: React.FC<AddTeamProps> = ({ onAddTeam }) => {
  const [newTeam, setNewTeam] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleAddTeam = () => {
    if (newTeam.trim() !== "") {
      onAddTeam(newTeam.trim());
      setNewTeam("");
      setIsOpen(false); // Close the dialog after adding the team
    }
  };

  return (
    <>
      <Button size="sm" variant={"outline"} onClick={() => setIsOpen(true)}>
        Add team
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add team</DialogTitle>
            <DialogDescription>Add a new team</DialogDescription>
            <DialogClose onClick={() => setIsOpen(false)} />
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
    </>
  );
};

export default AddTeam;
