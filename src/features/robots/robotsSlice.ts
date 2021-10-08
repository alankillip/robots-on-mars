import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Point } from "../shared";

type CommandType = "L" | "R" | "F";

export interface Robot {
  point: Point;
  orientation: "N" | "S" | "E" | "W";
  commands: CommandType[];
}

export interface RobotsState {
  robots: Robot[];
}

export interface AddMovePayload {
  robotIndex: number;
  command: CommandType;
}

const initialState: RobotsState = {
  robots: [],
};

export const robotSlice = createSlice({
  name: "robot",
  initialState,
  reducers: {
    addRobot: (state) => {
      state.robots.push({
        point: { x: 0, y: 0 },
        orientation: "N",
        commands: [],
      });
    },
    addMove: (state, action: PayloadAction<AddMovePayload>) => {
      const { robotIndex, command } = action.payload;
      state.robots[robotIndex].commands.push(command);
    },
  },
});

export const { addRobot, addMove } = robotSlice.actions;

export const selectRobots = (state: RootState) => state.robots.robots;

export default robotSlice.reducer;
