import React from "react";

interface TeamsListProps {
  teams: string[];
}

const TeamsList: React.FC<TeamsListProps> = ({ teams }) => {
  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {teams.map((team, index) => (
          <li key={index}>{team}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamsList;
