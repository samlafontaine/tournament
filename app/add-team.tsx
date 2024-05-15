import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

interface AddTeamProps {
  onAddTeam: (team: string) => void;
}

const AddTeam: React.FC<AddTeamProps> = ({ onAddTeam }) => {
  const [newTeam, setNewTeam] = useState("");

  const handleAddTeam = () => {
    if (newTeam.trim() !== "") {
      onAddTeam(newTeam.trim());
      setNewTeam("");
    }
  };

  return (
    <div className="flex flex-row gap-2">
      <Input
        type="text"
        placeholder="Enter team name"
        value={newTeam}
        onChange={(e) => setNewTeam(e.target.value)}
      />
      <DialogClose asChild className="">
        <Button onClick={handleAddTeam}>Add Team</Button>
      </DialogClose>
    </div>
  );
};

export default AddTeam;
