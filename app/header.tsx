import React from "react";

interface HeaderProps {
  tournamentName: string;
}

const Header: React.FC<HeaderProps> = ({ tournamentName }) => {
  return (
    <div className="">
      <p className="text-2xl font-medium bg-gradient-to-r from-cyan-500 to-blue-500 inline-block text-transparent bg-clip-text mb-1">
        {tournamentName}
      </p>
    </div>
  );
};

export default Header;
