// menu.tsx
import React from "react";
import { MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SettingsDropdownMenuProps {
  setIsWelcomeDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsDropdownMenu: React.FC<SettingsDropdownMenuProps> = ({
  setIsWelcomeDialogOpen,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuIcon className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Add team</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setIsWelcomeDialogOpen(true)}
          className="cursor-pointer hover:font-medium"
        >
          Edit name
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsDropdownMenu;
