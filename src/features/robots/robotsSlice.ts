import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Point } from "../shared";
import { mockRootState } from "../shared/mockState";

export type CommandType = "L" | "R" | "F";

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

export interface ModifyPosPayload {
  index: number;
  point: Point;
}

/*
const initialState: RobotsState = {
  robots: [],
};
 */

const initialState: RobotsState = mockRootState.robots;

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
    modifyPos: (state, action: PayloadAction<ModifyPosPayload>) => {
      const { index, point } = action.payload;
      state.robots[index].point = point;
    },
  },
});

export const { addRobot, addMove, modifyPos } = robotSlice.actions;

export const selectRobots = (state: RootState) => state.robots.robots;

export default robotSlice.reducer;
