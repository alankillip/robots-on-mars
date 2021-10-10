import React from "react";
import { RobotGrid } from "./RobotGrid";

type StateType = {
  currentWidth: number;
};

export class GraphicalOutput extends React.PureComponent {
  private containerRef = React.createRef<HTMLDivElement>();
  state: StateType = {
    currentWidth: 509,
  };
  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize = () => {
    const currentWidth = this.containerRef?.current?.offsetWidth;
    if (currentWidth) {
      this.setState({ currentWidth });
    }
  };
  render() {
    const { currentWidth } = this.state;
    return (
      <>
        <div ref={this.containerRef} style={{ width: "100%" }}>
          <RobotGrid width={currentWidth} />
        </div>
      </>
    );
  }
}
