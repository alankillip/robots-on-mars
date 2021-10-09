import gridReducer, {
  GridState,
  setGridHeight,
  setGridWidth,
  selectHeight,
  selectWidth,
} from "./gridSlice";
import { RootState } from "../../app/store";
import { mockRootState } from "../shared/mockState";

describe("grid reducer", () => {
  const initialState: GridState = {
    rightX: 5,
    topY: 3,
  };
  it("should handle initial state", () => {
    expect(gridReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setGridHeight", () => {
    const actual = gridReducer(initialState, setGridHeight(7));
    expect(actual.topY).toEqual(7);
  });

  it("should handle setGridWidth", () => {
    const actual = gridReducer(initialState, setGridWidth(8));
    expect(actual.rightX).toEqual(8);
  });
});

describe("grid selectors", () => {
  const mockState: RootState = mockRootState;
  it("should select width", () => {
    expect(selectWidth(mockState)).toBe(5);
  });

  it("should select heights", () => {
    expect(selectHeight(mockState)).toBe(3);
  });
});
