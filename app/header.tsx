import React from "react";

interface HeaderProps {
  tournamentName: string;
}

const Header: React.FC<HeaderProps> = ({ tournamentName }) => {
  return (
    <div className="mb-12">
      <p className="text-2xl font-medium bg-gradient-to-r from-cyan-500 to-blue-500 inline-block text-transparent bg-clip-text mb-1">
        {tournamentName}
      </p>
      <p className="text-sm text-zinc-600 leading-relaxed">
        Information about the ongoing{" "}
        <span className="lowercase font-medium">{tournamentName}</span>. Add and
        view recently played matches, and see who's currently leading in the
        rankings.
      </p>
    </div>
  );
};

export default Header;
