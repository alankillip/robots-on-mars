import { CommandType } from "../../features/robots/robotsSlice";

export const restrictCommands = (commands: string): CommandType[] => {
  const upperCaseCommands = commands.toUpperCase();
  return upperCaseCommands
    .split("")
    .filter((command: string) => ["F", "L", "R"].indexOf(command) > -1)
    .slice(0, 50) as CommandType[];
};
