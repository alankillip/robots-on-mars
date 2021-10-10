import { useSelector } from "react-redux";
import { selectHeight, selectWidth } from "../../features/grid/gridSlice";
import {
  selectCurrentRobotIndex,
  selectRobots,
  setCurrentRobotIndex,
} from "../../features/robots/robotsSlice";
import { getMovedRobots, isScentPresent, MovingRobot } from "./getOutput";
import { Point } from "../../features/shared";
import { useAppDispatch } from "../../app/hooks";

type PropTypes = {
  width: number;
};

const getRobotTransform = (orientation: string) => {
  const map = {
    N: "rotate(0deg)",
    E: "rotate(90deg)",
    S: "rotate(180deg)",
    W: "rotate(270deg)",
  };
  // @ts-ignore
  return map[orientation];
};

const isScent = (point: Point, movedRobots: MovingRobot[]) => {
  const scentReducer = (result: Point[], movedRobot: MovingRobot) => {
    if (movedRobot.lost) {
      return result.concat(movedRobot.point);
    }
    return result;
  };
  const scents = movedRobots.reduce(scentReducer, []);
  return isScentPresent(point, scents);
};

export const RobotGrid = (props: PropTypes) => {
  const currentRobotIndex = useSelector(selectCurrentRobotIndex);
  const rightX = useSelector(selectWidth);
  const topY = useSelector(selectHeight);
  const gridWidth = rightX + 1;
  const gridHeight = topY + 1;
  const robots = useSelector(selectRobots);
  const movedRobots = getMovedRobots(rightX, topY, robots);
  const { width } = props;
  const dim = gridWidth > gridHeight ? gridWidth : gridHeight;
  const tileSize = width / dim;
  const tiles = new Array(gridHeight).fill(0);
  const cols = new Array(gridWidth).fill(tiles);
  const dispatch = useAppDispatch();

  const gridFunction = (col: number[], xIndex: number) =>
    col.map((tile: number, yIndex: number) => (
      <div
        key={`${xIndex}-${yIndex}`}
        style={{
          position: "absolute",
          border: "1px solid grey",
          width: tileSize,
          height: tileSize,
          left: xIndex * tileSize,
          top: yIndex * tileSize,
          backgroundColor: isScent({ x: xIndex, y: topY - yIndex }, movedRobots)
            ? "red"
            : "white",
        }}
      />
    ));

  const robotFunction = (robot: MovingRobot, index: number) => {
    const { point, lost } = robot;
    const { x, y } = point;
    if (lost) {
      return null;
    }
    const SELECTED_BORDER_WIDTH = 4;
    const isSelected = currentRobotIndex === index;
    const selectedOffset = isSelected ? SELECTED_BORDER_WIDTH : 0;
    const id = "./robot.png";
    return (
      <img
        onClick={() => dispatch(setCurrentRobotIndex({ index: index }))}
        key={`robot-${index}`}
        src={id}
        alt={id}
        style={{
          position: "absolute",
          width: tileSize,
          height: tileSize,
          left: x * tileSize - selectedOffset,
          top: (topY - y) * tileSize - selectedOffset,
          transform: getRobotTransform(robot.orientation),
          border: isSelected ? `${SELECTED_BORDER_WIDTH}px solid green` : "",
        }}
      />
    );
  };

  return (
    <div style={{ position: "relative" }}>
      {cols.map(gridFunction)}
      {movedRobots.map(robotFunction)}
    </div>
  );
};
