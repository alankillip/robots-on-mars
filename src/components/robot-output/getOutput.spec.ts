import { selectRobots } from "../../features/robots/robotsSlice";
import { mockRootState } from "../../features/shared/mockState";
import { selectHeight, selectWidth } from "../../features/grid/gridSlice";
import { getOutput, updateOrientation } from "./getOutput";

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
