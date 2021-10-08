import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Point } from "../shared";

export interface GridState {
  width: number;
  height: number;
  scents: Point[];
}

const initialState: GridState = {
  width: 15,
  height: 15,
  scents: [],
};

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setGridWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    setGridHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
    },
  },
});

export const { setGridWidth, setGridHeight } = gridSlice.actions;

export const selectWidth = (state: RootState) => state.grid.width;
export const selectHeight = (state: RootState) => state.grid.height;
export const selectScents = (state: RootState) => state.grid.scents;

export default gridSlice.reducer;
