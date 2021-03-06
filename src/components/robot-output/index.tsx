import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { BasicOutput } from "./basicOutput";
import { GraphicalOutput } from "./GraphicalOutput";
import { SyntheticEvent } from "react";

type TabPanelType = { children: React.ReactNode; value: number; index: number };

function TabPanel(props: TabPanelType) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const RobotOutput = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs to select view mode"
        >
          <Tab label="Graphical" {...a11yProps(0)} />
          <Tab label="Text" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <GraphicalOutput />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BasicOutput />
      </TabPanel>
    </Box>
  );
};
