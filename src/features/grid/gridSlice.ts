import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Point } from "../shared";

export interface GridState {
  rightX: number;
  topY: number;
}

const initialState: GridState = {
  rightX: 5,
  topY: 3,
};

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setGridWidth: (state, action: PayloadAction<number>) => {
      state.rightX = action.payload;
    },
    setGridHeight: (state, action: PayloadAction<number>) => {
      state.topY = action.payload;
    },
  },
});

export const { setGridWidth, setGridHeight } = gridSlice.actions;

export const selectWidth = (state: RootState) => state.grid.rightX;
export const selectHeight = (state: RootState) => state.grid.topY;

export default gridSlice.reducer;
