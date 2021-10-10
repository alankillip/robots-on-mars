import { useSelector } from "react-redux";
import { selectHeight, selectWidth } from "../../features/grid/gridSlice";
import { selectRobots } from "../../features/robots/robotsSlice";

type PropTypes = {
  width: number;
};

export const RobotGrid = (props: PropTypes) => {
  const rightX = useSelector(selectWidth);
  const topX = useSelector(selectHeight);
  // const robots = useSelector(selectRobots);
  const { width } = props;
  const dim = rightX > topX ? rightX : topX;
  const tileSize = width / dim;
  const tiles = new Array(topX).fill(0);
  const cols = new Array(rightX).fill(tiles);
  return (
    <div style={{ position: "relative" }}>
      {cols.map((col, xindex) =>
        col.map((tile: number, yIndex: number) => (
          <div
            key={`${xindex}-${yIndex}`}
            style={{
              position: "absolute",
              border: "1px solid grey",
              width: tileSize,
              height: tileSize,
              left: xindex * tileSize,
              top: yIndex * tileSize,
            }}
          />
        ))
      )}
    </div>
  );
};
