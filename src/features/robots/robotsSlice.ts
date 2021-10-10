import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Point } from "../shared";

export type CommandType = "L" | "R" | "F";

export type OrientationType = "N" | "S" | "E" | "W";

export interface Robot {
  point: Point;
  orientation: OrientationType;
  commands: CommandType[];
}

export interface RobotsState {
  robots: Robot[];
  currentIndex: number;
}

export interface AddMovePayload {
  robotIndex: number;
  command: CommandType;
}

export interface SetCommandsPayload {
  index: number;
  commands: CommandType[];
}

export interface ModifyPosPayload {
  index: number;
  point: Point;
}

export interface ModifyOrientationPayload {
  index: number;
  orientation: OrientationType;
}

export interface IndexPayload {
  index: number;
}

const initialState: RobotsState = {
  robots: [],
  currentIndex: 0,
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
    setCurrentRobotIndex: (state, action: PayloadAction<IndexPayload>) => {
      state.currentIndex = action.payload.index;
    },
    deleteRobot: (state, action: PayloadAction<IndexPayload>) => {
      state.robots.splice(action.payload.index, 1);
      state.currentIndex = Math.max(
        state.robots.length - 1,
        state.currentIndex
      );
      state.currentIndex = Math.min(0, state.currentIndex);
    },
    addMove: (state, action: PayloadAction<AddMovePayload>) => {
      const { robotIndex, command } = action.payload;
      state.robots[robotIndex].commands.push(command);
    },
    setCommands: (state, action: PayloadAction<SetCommandsPayload>) => {
      const { index, commands } = action.payload;
      state.robots[index].commands = commands;
    },
    modifyPos: (state, action: PayloadAction<ModifyPosPayload>) => {
      const { index, point } = action.payload;
      state.robots[index].point = point;
    },
    modifyOrientation: (
      state,
      action: PayloadAction<ModifyOrientationPayload>
    ) => {
      const { index, orientation } = action.payload;
      state.robots[index].orientation = orientation;
    },
  },
});

export const {
  addRobot,
  addMove,
  modifyPos,
  modifyOrientation,
  setCommands,
  setCurrentRobotIndex,
  deleteRobot,
} = robotSlice.actions;

export const selectRobots = (state: RootState) => state.robots.robots;
export const selectCurrentRobotIndex = (state: RootState) =>
  state.robots.currentIndex;

export default robotSlice.reducer;
