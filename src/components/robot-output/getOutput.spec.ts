import { Robot, selectRobots } from "../../features/robots/robotsSlice";
import { mockRootState } from "../../features/shared/mockState";
import { selectHeight, selectWidth } from "../../features/grid/gridSlice";
import {
  getOutput,
  updateOrientation,
  getCandidatePosition,
  isScentPresent,
  MovingRobot,
} from "./getOutput";

describe("isScentPresent", () => {
  it("should return true if a point is present in an array of points", () => {
    const point = { x: 3, y: 9 };
    const scents = [
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 5, y: 6 },
      { x: 3, y: 9 },
      { x: 3, y: 9 },
    ];
    expect(isScentPresent(point, scents)).toBe(true);
  });
  it("should return false if a point is NOT present in an array of points", () => {
    const point = { x: 10, y: 10 };
    const scents = [
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 5, y: 6 },
      { x: 3, y: 9 },
      { x: 3, y: 9 },
    ];
    expect(isScentPresent(point, scents)).toBe(false);
  });
});

describe("getCandidatePosition", () => {
  it("should update the position by moving in the direction indicated by orientation", () => {
    const movingRobotTemplate = {
      point: { x: 5, y: 5 },
      lost: false,
      commands: [],
    };
    let movingRobot: MovingRobot = {
      ...movingRobotTemplate,
      orientation: "N",
    };
    let candidatePosition = getCandidatePosition(movingRobot);
    expect(candidatePosition.x).toEqual(5);
    expect(candidatePosition.y).toEqual(4);

    movingRobot = {
      ...movingRobotTemplate,
      orientation: "E",
    };
    candidatePosition = getCandidatePosition(movingRobot);
    expect(candidatePosition.x).toEqual(6);
    expect(candidatePosition.y).toEqual(5);

    movingRobot = {
      ...movingRobotTemplate,
      orientation: "S",
    };
    candidatePosition = getCandidatePosition(movingRobot);
    expect(candidatePosition.x).toEqual(5);
    expect(candidatePosition.y).toEqual(6);

    movingRobot = {
      ...movingRobotTemplate,
      orientation: "W",
    };
    candidatePosition = getCandidatePosition(movingRobot);
    expect(candidatePosition.x).toEqual(4);
    expect(candidatePosition.y).toEqual(5);
  });
});

describe("updateOrientation", () => {
  it("should update the direction by applying left and right turns", () => {
    const orientation = `S`;
    expect(updateOrientation(orientation, "R")).toEqual("W");
    expect(updateOrientation(orientation, "L")).toEqual("E");
  });
});

describe("getOutput", () => {
  it("should output sample output from mock state", () => {
    const expected = `1 1 E
3 3 N LOST
2 3 S`;
    const leftX = selectWidth(mockRootState);
    const topY = selectHeight(mockRootState);
    const robots = selectRobots(mockRootState);
    const result = getOutput(leftX, topY, robots);
    expect(result).toEqual(expected);
  });
});
