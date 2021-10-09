import { Robot } from "../../features/robots/robotsSlice";
import { Point } from "../../features/shared";

export interface MovingRobot {
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

export const getCandidatePosition = (robot: MovingRobot): Point => {
  const { x, y } = robot.point;
  switch (robot.orientation) {
    case "N":
      return {
        x,
        y: y - 1,
      };
    case "E":
      return {
        x: x + 1,
        y,
      };
    case "S":
      return {
        x,
        y: y + 1,
      };
    case "W":
      return {
        x: x - 1,
        y,
      };
  }
  return { x: -1, y: -1 };
};

export const isScentPresent = (point: Point, scents: Point[]) => {
  const indexFinder = (scent: Point) =>
    point.x === scent.x && point.y === scent.y;
  return scents.findIndex(indexFinder) !== -1;
};

export const getOutput = (leftX: number, topY: number, robots: Robot[]) => {
  const output = ``;
  /*
  const movingRobots = robots.map(getMovingRobot);
  const scents: Point[] = [];

  const moveRobot = (movingRobot: MovingRobot) => {
    const movedRobot = {
      ...movingRobot,
    };
    const applyCommand = (command: "L" | "R" | "F") => {
      if (command === "L" || command === "R") {
        movedRobot.orientation = updateOrientation(
          movedRobot.orientation,
          command
        );
      } else {
        // Gotta be 'F'
        const candidatePosition: Point = getCandidatePosition(movedRobot);
        if (candidatePosition.x < 0 || candidatePosition.x > leftX || candidatePosition.y < 0 || candidatePosition.y > topY) {

        }
      }
    };
  };
   */
  return output;
};
