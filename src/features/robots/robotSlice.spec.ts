import robotsReducer, {
  addMove,
  addRobot,
  RobotsState,
  selectRobots,
} from "./robotsSlice";
import { mockRootState } from "../shared/mockState";

describe("robotsReducer", () => {
  const initialState: RobotsState = {
    robots: [
      {
        point: { x: 3, y: 5 },
        orientation: "E",
        commands: [],
      },
    ],
  };
  it("should handle initial state", () => {
    expect(robotsReducer(initialState, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle addRobot", () => {
    const actual = robotsReducer(initialState, addRobot());
    expect(actual.robots.length).toEqual(2);
  });

  it("should handle addMove", () => {
    const actual = robotsReducer(
      initialState,
      addMove({ command: "L", robotIndex: 0 })
    );
    expect(actual.robots[0].commands[0]).toEqual("L");
  });
});

describe("robot selectors", () => {
  it("should select selectRobots", () => {
    expect(selectRobots(mockRootState)).toEqual([]);
  });
});
