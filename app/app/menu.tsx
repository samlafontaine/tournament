import React, { useState } from "react";
import { MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddTeam from "./add-team";
import ViewTeamsDialog from "./view-teams";
import { Pencil, Plus, Trophy } from "lucide-react";

interface SettingsDropdownMenuProps {
  onOpenEditNameDialog: () => void;
  onAddTeam: (newTeam: string) => void;
  teams: string[];
}

const SettingsDropdownMenu: React.FC<SettingsDropdownMenuProps> = ({
  onOpenEditNameDialog,
  onAddTeam,
  teams,
}) => {
  const [isAddTeamDialogOpen, setIsAddTeamDialogOpen] = useState(false);
  const [isViewTeamsDialogOpen, setIsViewTeamsDialogOpen] = useState(false);

  const handleAddTeam = (newTeam: string) => {
    onAddTeam(newTeam);
    setIsAddTeamDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MenuIcon className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onOpenEditNameDialog}
            className="flex flex-row gap-1 cursor-pointer hover:font-medium"
          >
            <Pencil className="h-3 w-3" />
            Edit name
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsAddTeamDialogOpen(true)}
            className="flex flex-row gap-1 cursor-pointer hover:font-medium"
          >
            <Plus className="h-3 w-3" />
            Add team
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsViewTeamsDialogOpen(true)}
            className="flex flex-row gap-1 cursor-pointer hover:font-medium"
          >
            <Trophy className="h-3 w-3" />
            View teams
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <div className="w-28 px-2 py-0.5">
            <p className="text-[10px] text-black">
              built in Montréal by{" "}
              <a
                href="https://www.samlafontaine.com"
                className="font-medium hover:italic"
              >
                Sam Lafontaine
              </a>
            </p>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Add Team Dialog */}
      <AddTeam
        open={isAddTeamDialogOpen}
        onClose={() => setIsAddTeamDialogOpen(false)}
        onAddTeam={handleAddTeam}
      />

      {/* View Teams Dialog */}
      <ViewTeamsDialog
        open={isViewTeamsDialogOpen}
        onClose={() => setIsViewTeamsDialogOpen(false)}
        teams={teams}
      />
    </>
  );
};

export default SettingsDropdownMenu;
