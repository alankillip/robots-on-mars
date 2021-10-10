import { useSelector } from "react-redux";
import { selectHeight, selectWidth } from "../../features/grid/gridSlice";
import { selectRobots } from "../../features/robots/robotsSlice";
import { getOutput } from "./getOutput";

export const BasicOutput = () => {
  const rightX = useSelector(selectWidth);
  const topX = useSelector(selectHeight);
  const robots = useSelector(selectRobots);
  const output = getOutput(rightX, topX, robots);
  return (
    <textarea
      value={output}
      readOnly={true}
      style={{ border: "none", outline: "none", height: 400 }}
    />
  );
};
