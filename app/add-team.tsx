import React, { useState } from "react";

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
    <div>
      <input
        type="text"
        placeholder="Enter team name"
        value={newTeam}
        onChange={(e) => setNewTeam(e.target.value)}
      />
      <button onClick={handleAddTeam}>Add Team</button>
    </div>
  );
};

export default AddTeam;
