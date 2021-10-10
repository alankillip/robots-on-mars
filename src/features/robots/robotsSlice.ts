import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Point } from "../shared";
import { mockRootState } from "../shared/mockState";

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

export interface SetCurrentIndexPayload {
  index: number;
}

/*const initialState: RobotsState = {
  robots: [],
};*/

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
    setCurrentRobotIndex: (
      state,
      action: PayloadAction<SetCurrentIndexPayload>
    ) => {
      state.currentIndex = action.payload.index;
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
} = robotSlice.actions;

export const selectRobots = (state: RootState) => state.robots.robots;
export const selectCurrentRobotIndex = (state: RootState) =>
  state.robots.currentIndex;

export default robotSlice.reducer;
