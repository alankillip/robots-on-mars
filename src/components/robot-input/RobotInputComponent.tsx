import { Robot, modifyPos } from "../../features/robots/robotsSlice";
import { Card, Stack, Slider, Typography } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { selectHeight, selectWidth } from "../../features/grid/gridSlice";

export const RobotInputComponent = (props: { robot: Robot; index: number }) => {
  const { robot, index } = props;
  const { point, orientation } = robot;
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

  return (
    <Card variant="outlined" sx={{ margin: 1, padding: 1 }}>
      <Typography>Robot {index}</Typography>
      x:
      <Slider
        aria-label="x"
        value={x ?? 0}
        onChange={posChangeX}
        max={width}
        size="small"
        valueLabelDisplay="auto"
      />
      y:
      <Slider
        aria-label="x"
        value={y ?? 0}
        onChange={posChangeY}
        max={height}
        size="small"
        valueLabelDisplay="auto"
      />
    </Card>
  );
};
