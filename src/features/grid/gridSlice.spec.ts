import gridReducer, {
  GridState,
  setGridHeight,
  setGridWidth,
  selectHeight,
  selectWidth,
} from "./gridSlice";
import { RootState } from "../../app/store";

describe("grid reducer", () => {
  const initialState: GridState = {
    rightX: 15,
    topY: 15,
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
  const mockState: RootState = {
    grid: {
      rightX: 4,
      topY: 5,
    },
    robots: { robots: [] },
  };
  it("should select width", () => {
    expect(selectWidth(mockState)).toBe(4);
  });

  it("should select heights", () => {
    expect(selectHeight(mockState)).toBe(5);
  });
});
