import * as React from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectWidth,
  selectHeight,
  setGridWidth,
  setGridHeight,
} from "../../features/grid/gridSlice";
import { useAppDispatch } from "../../app/hooks";

const sliderStyle = {
  width: "100%",
};

export const RobotInput = () => {
  const width = useSelector(selectWidth);
  const height = useSelector(selectHeight);
  const dispatch = useAppDispatch();

  const widthChange = (e: unknown, newValue: any) => {
    dispatch(setGridWidth(newValue));
  };

  const heightChange = (e: unknown, newValue: any) => {
    dispatch(setGridHeight(newValue));
  };

  return (
    <Box width={"100%"}>
      <Typography id="input-slider" gutterBottom>
        Grid Width
      </Typography>
      <Slider
        sx={sliderStyle}
        size="small"
        min={2}
        max={50}
        defaultValue={width}
        aria-label="Small"
        valueLabelDisplay="auto"
        onChange={widthChange}
      />
      <Typography id="input-slider" gutterBottom>
        Grid Height
      </Typography>
      <Slider
        sx={sliderStyle}
        size="small"
        min={2}
        max={50}
        defaultValue={height}
        aria-label="Small"
        valueLabelDisplay="auto"
        onChange={heightChange}
      />
    </Box>
  );
};
