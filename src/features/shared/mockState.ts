import { RootState } from "../../app/store";

export const mockRootState: RootState = {
  grid: {
    rightX: 5,
    topY: 3,
  },
  robots: {
    /*
    Sample Input (somehow through the GUI)
    5 3 1 1 E RFRFRFRF
    3 2 N FRRFLLFFRRFLL
    0 3 W LLFFFLFLFL
     */
    robots: [
      {
        point: { x: 1, y: 1 },
        orientation: "E",
        commands: ["R", "F", "R", "F", "R", "F", "R", "F"],
      },
      {
        point: { x: 3, y: 2 },
        orientation: "N",
        commands: [
          "F",
          "R",
          "R",
          "F",
          "L",
          "L",
          "F",
          "F",
          "R",
          "R",
          "F",
          "L",
          "L",
        ],
      },
      {
        point: { x: 0, y: 3 },
        orientation: "W",
        commands: ["L", "L", "F", "F", "F", "L", "F", "L", "F", "L"],
      },
    ],
  },
};
