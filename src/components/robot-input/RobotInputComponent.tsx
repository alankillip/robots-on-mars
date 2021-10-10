import {
  Robot,
  modifyPos,
  modifyOrientation,
  setCommands,
  deleteRobot,
  OrientationType,
} from "../../features/robots/robotsSlice";
import {
  Card,
  MenuItem,
  Slider,
  Typography,
  Select,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { selectHeight, selectWidth } from "../../features/grid/gridSlice";
import { restrictCommands } from "./utils";
import React from "react";
import { SliderNewValueType } from "./types";

type PropTypes = { robot: Robot; index: number; lost: boolean };

export const RobotInputComponent = (props: PropTypes) => {
  const { robot, index, lost } = props;
  const { point, orientation, commands } = robot;
  const commandString = commands.join("");
  const { x, y } = point;
  const width = useSelector(selectWidth);
  const height = useSelector(selectHeight);

  const dispatch = useAppDispatch();

  const posChangeX = (e: Event, newValue: SliderNewValueType) => {
    const payload = {
      point: {
        x: newValue as number,
        y,
      },
      index,
    };
    dispatch(modifyPos(payload));
  };

  const posChangeY = (e: Event, newValue: SliderNewValueType) => {
    const payload = {
      point: {
        x,
        y: newValue as number,
      },
      index,
    };
    dispatch(modifyPos(payload));
  };

  const orientationChange = (
    e: SelectChangeEvent<OrientationType>,
    target: any
  ) => {
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
