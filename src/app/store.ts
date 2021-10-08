import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import gridReducer from "../features/grid/gridSlice";
import robotReducer from "../features/robots/robotsSlice";

export const store = configureStore({
  reducer: {
    grid: gridReducer,
    robots: robotReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
