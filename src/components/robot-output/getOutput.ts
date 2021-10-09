import { Robot } from "../../features/robots/robotsSlice";
import { Point } from "../../features/shared";

interface MovingRobot {
  point: Point;
  orientation: string;
  commands: string[];
  lost: boolean;
}

const getMovingRobot = (robot: Robot): MovingRobot => ({
  ...robot,
  lost: false,
});

export const updateOrientation = (orientation: string, command: "L" | "R") => {
  const orientations = ["N", "E", "S", "W"];
  const direction = command === "R" ? 1 : -1;
  const currentIndex = orientations.indexOf(orientation);
  const rightMostIndex = orientations.length - 1;
  let newIndex = currentIndex + direction;
  if (newIndex < 0) {
    newIndex = rightMostIndex;
  }
  if (newIndex > rightMostIndex) {
    newIndex = 0;
  }
  return orientations[newIndex];
};

const moveRobot = (
  robot: MovingRobot,
  index: number,
  allRobots: MovingRobot[]
) => {};

export const getOutput = (leftX: number, topY: number, robots: Robot[]) => {
  const movingRobots = robots.map(getMovingRobot);
  const output = ``;

  return output;
};
