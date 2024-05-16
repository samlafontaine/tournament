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
        <DropdownMenuContent>
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onOpenEditNameDialog}>
            Edit name
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsAddTeamDialogOpen(true)}>
            Add team
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsViewTeamsDialogOpen(true)}>
            View teams
          </DropdownMenuItem>
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
