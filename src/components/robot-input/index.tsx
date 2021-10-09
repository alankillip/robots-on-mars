import * as React from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/ControlPoint";
import { useSelector } from "react-redux";
import {
  selectWidth,
  selectHeight,
  setGridWidth,
  setGridHeight,
} from "../../features/grid/gridSlice";
import { useAppDispatch } from "../../app/hooks";
import { RobotInputComponent } from "./RobotInputComponent";
import { Robot, selectRobots } from "../../features/robots/robotsSlice";

const containerStyle: React.CSSProperties = {
  textAlign: "left",
};

const sliderStyle = {
  width: "100%",
};

export const RobotInput = () => {
  const width = useSelector(selectWidth);
  const height = useSelector(selectHeight);
  const robots = useSelector(selectRobots);
  const dispatch = useAppDispatch();

  const widthChange = (e: unknown, newValue: any) => {
    dispatch(setGridWidth(newValue));
  };

  const heightChange = (e: unknown, newValue: any) => {
    dispatch(setGridHeight(newValue));
  };

  return (
    <Box width={"100%"} sx={containerStyle}>
      <Typography id="input-slider" gutterBottom>
        Max x ( grid left )
      </Typography>
      <Slider
        sx={sliderStyle}
        size="small"
        min={2}
        max={50}
        value={width ?? 0}
        aria-label="Small"
        valueLabelDisplay="auto"
        onChange={widthChange}
      />
      <Typography id="input-slider" gutterBottom>
        Max y ( grid top )
      </Typography>
      <Slider
        sx={sliderStyle}
        size="small"
        min={2}
        max={50}
        value={height ?? 0}
        aria-label="Small"
        valueLabelDisplay="auto"
        onChange={heightChange}
      />
      {robots.map((robot: Robot, index: number) => (
        <RobotInputComponent key={index} robot={robot} index={index} />
      ))}
      <Button variant="outlined" startIcon={<DeleteIcon />}>
        New Robot
      </Button>
    </Box>
  );
};
