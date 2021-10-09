import * as React from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Button, Pagination, Typography } from "@mui/material";
import ControlPoint from "@mui/icons-material/ControlPoint";
import { useSelector } from "react-redux";
import {
  selectWidth,
  selectHeight,
  setGridWidth,
  setGridHeight,
} from "../../features/grid/gridSlice";
import { useAppDispatch } from "../../app/hooks";
import { RobotInputComponent } from "./RobotInputComponent";
import {
  Robot,
  selectRobots,
  addRobot,
} from "../../features/robots/robotsSlice";
import { useState } from "react";

const containerStyle: React.CSSProperties = {
  textAlign: "left",
};

const sliderStyle = {
  width: "100%",
};

export const RobotInput = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const currentRobotIndex = currentPage - 1;
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

  const handlePageChange = (e: unknown, newValue: any) => {
    setCurrentPage(newValue);
  };
  const robot = robots[currentRobotIndex];
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
      {robots.length > 1 && (
        <Pagination
          count={robots.length}
          variant="outlined"
          shape="rounded"
          page={currentPage}
          onChange={handlePageChange}
        />
      )}
      {robot && <RobotInputComponent robot={robot} index={currentRobotIndex} />}
      <Button
        variant="outlined"
        startIcon={<ControlPoint />}
        onClick={() => dispatch(addRobot())}
      >
        New Robot
      </Button>
    </Box>
  );
};
