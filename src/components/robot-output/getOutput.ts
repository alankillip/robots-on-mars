import { CommandType, Robot } from "../../features/robots/robotsSlice";
import { Point } from "../../features/shared";

export interface MovingRobot {
  point: Point;
  orientation: string;
  commands: CommandType[];
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

export const parseRobotsToOutputString = (robots: MovingRobot[]): string => {
  const getRobotOutput = (robot: MovingRobot) => {
    const { x, y } = robot.point;
    const { orientation } = robot;
    const lost = robot.lost ? " LOST" : "";
    return `${x} ${y} ${orientation}${lost}`;
  };
  const outputReducer = (
    result: string,
    robot: MovingRobot,
    index: number,
    array: MovingRobot[]
  ) => {
    const updatedResult = `${result}${getRobotOutput(robot)}`;
    if (index === array.length - 1) {
      return updatedResult;
    }
    return `${updatedResult}\n`;
  };
  return robots.reduce(outputReducer, "");
};

export const getOutput = (leftX: number, topY: number, robots: Robot[]) => {
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
        if (
          candidatePosition.x < 0 ||
          candidatePosition.x > leftX ||
          candidatePosition.y < 0 ||
          candidatePosition.y > topY
        ) {
          if (!isScentPresent(candidatePosition, scents)) {
            scents.push(candidatePosition);
            movedRobot.lost = true;
          }
        } else {
          movedRobot.point = candidatePosition;
        }
      }
    };
    movedRobot.commands.map(applyCommand);
    return movedRobot;
  };
  const movedRobots = movingRobots.map(moveRobot);
  const output = parseRobotsToOutputString(movedRobots);
  return output;
};
