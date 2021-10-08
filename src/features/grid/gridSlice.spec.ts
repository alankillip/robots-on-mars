import gridReducer, {
  GridState,
  setGridHeight,
  setGridWidth,
  selectHeight,
  selectWidth,
  selectScents,
} from "./gridSlice";
import { RootState } from "../../app/store";

describe("grid reducer", () => {
  const initialState: GridState = {
    width: 15,
    height: 15,
    scents: [],
  };
  it("should handle initial state", () => {
    expect(gridReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setGridHeight", () => {
    const actual = gridReducer(initialState, setGridHeight(7));
    expect(actual.height).toEqual(7);
  });

  it("should handle setGridWidth", () => {
    const actual = gridReducer(initialState, setGridWidth(8));
    expect(actual.width).toEqual(8);
  });
});

describe("grid selectors", () => {
  const mockState: RootState = {
    grid: {
      width: 4,
      height: 5,
      scents: [],
    },
    robots: { robots: [] },
  };
  it("should select width", () => {
    expect(selectWidth(mockState)).toBe(4);
  });

  it("should select heights", () => {
    expect(selectHeight(mockState)).toBe(5);
  });

  it("should select scents", () => {
    expect(selectScents(mockState)).toEqual([]);
  });
});
