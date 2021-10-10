import {
  Robot,
  modifyPos,
  modifyOrientation,
  setCommands,
  deleteRobot,
} from "../../features/robots/robotsSlice";
import {
  Card,
  MenuItem,
  Slider,
  Typography,
  Select,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { selectHeight, selectWidth } from "../../features/grid/gridSlice";
import { restrictCommands } from "./utils";
import React from "react";

type PropTypes = { robot: Robot; index: number; lost: boolean };

export const RobotInputComponent = (props: PropTypes) => {
  const { robot, index, lost } = props;
  const { point, orientation, commands } = robot;
  const commandString = commands.join("");
  const { x, y } = point;
  const width = useSelector(selectWidth);
  const height = useSelector(selectHeight);

  const dispatch = useAppDispatch();

  const posChangeX = (e: unknown, newValue: any) => {
    const payload = {
      point: {
        x: newValue,
        y,
      },
      index,
    };
    dispatch(modifyPos(payload));
  };

  const posChangeY = (e: unknown, newValue: any) => {
    const payload = {
      point: {
        x,
        y: newValue,
      },
      index,
    };
    dispatch(modifyPos(payload));
  };

  const orientationChange = (e: unknown, target: any) => {
    const payload = {
      index,
      orientation: target.props.value,
    };
    dispatch(modifyOrientation(payload));
  };

  const textAreaChange = (e: any) => {
    const payload = {
      index,
      commands: restrictCommands(e.target.value),
    };
    dispatch(setCommands(payload));
  };

  const handleDelete = (e: any) => {
    const payload = {
      index,
    };
    dispatch(deleteRobot(payload));
  };

  return (
    <Card
      variant="outlined"
      sx={{ margin: 1, padding: 1, display: "flex", flexDirection: "column" }}
    >
      <Typography>
        Robot {index + 1}
        {lost ? " (LOST)" : ""}
      </Typography>
      initial x:
      <Slider
        aria-label="x"
        value={x ?? 0}
        onChange={posChangeX}
        max={width}
        size="small"
        valueLabelDisplay="auto"
      />
      initial y:
      <Slider
        aria-label="x"
        value={y ?? 0}
        onChange={posChangeY}
        max={height}
        size="small"
        valueLabelDisplay="auto"
      />
      Initial Orientation:
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={orientation ?? "N"}
        onChange={orientationChange}
      >
        <MenuItem value={"N"}>NORTH</MenuItem>
        <MenuItem value={"S"}>SOUTH</MenuItem>
        <MenuItem value={"E"}>EAST</MenuItem>
        <MenuItem value={"W"}>WEST</MenuItem>
      </Select>
      Edit Commands: ({50 - commandString.length} left)
      <textarea
        onChange={textAreaChange}
        value={commandString}
        style={{ resize: "none", height: 50 }}
      />
      <IconButton
        aria-label="delete"
        color="error"
        onClick={handleDelete}
        size="small"
      >
        <DeleteIcon />
        Delete
      </IconButton>
    </Card>
  );
};
