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
  selectRobots,
  addRobot,
  selectCurrentRobotIndex,
  setCurrentRobotIndex,
} from "../../features/robots/robotsSlice";
import { getMovedRobots } from "../robot-output/getOutput";
import { ChangeEvent } from "react";

const containerStyle: React.CSSProperties = {
  textAlign: "left",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const sliderStyle = {
  width: "100%",
};

type SliderNewValueType = number | number[];

export const RobotInput = () => {
  const currentRobotIndex = useSelector(selectCurrentRobotIndex);
  const width = useSelector(selectWidth);
  const height = useSelector(selectHeight);
  const robots = useSelector(selectRobots);
  const movingRobots = getMovedRobots(width, height, robots);
  const movedRobot = movingRobots[currentRobotIndex];
  const dispatch = useAppDispatch();

  const widthChange = (e: Event, newValue: SliderNewValueType) => {
    dispatch(setGridWidth(newValue as number));
  };

  const heightChange = (e: Event, newValue: SliderNewValueType) => {
    dispatch(setGridHeight(newValue as number));
  };

  const handlePageChange = (e: ChangeEvent<unknown>, index: number) => {
    dispatch(setCurrentRobotIndex({ index: index - 1 }));
  };
  const robot = robots[currentRobotIndex];
  return (
    <Box width={"100%"} sx={containerStyle}>
      <Typography id="input-slider" gutterBottom>
        Max X ( Grid Right )
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
        Max Y ( Grid Top )
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
        <>
          <Typography id="input-slider" gutterBottom>
            Select Robot:
          </Typography>
          <Pagination
            count={robots.length}
            variant="outlined"
            shape="rounded"
            page={currentRobotIndex + 1}
            onChange={handlePageChange}
          />
        </>
      )}
      {robot && (
        <RobotInputComponent
          robot={robot}
          lost={movedRobot.lost}
          index={currentRobotIndex}
        />
      )}
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
