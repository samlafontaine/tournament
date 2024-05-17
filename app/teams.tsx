import React from "react";

interface TeamsListProps {
  teams: string[];
}

const TeamsList: React.FC<TeamsListProps> = ({ teams }) => {
  return (
    <div>
      <ul className="divide-y divide-zinc-200">
        {teams.map((team, index) => (
          <li key={index} className="py-2 text-md">
            {index + 1}. {team}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamsList;
