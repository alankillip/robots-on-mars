import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { RobotInput } from "./components/robot-input";
import { RobotOutput } from "./components/robot-output";
import { Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  minHeight: 600,
  display: "flex",
}));

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        "& > :not(style)": {
          m: 1,
          padding: 2,
          width: "100%",
          height: "100%",
        },
      }}
    >
      <Paper elevation={3} sx={{ maxWidth: 800, minHeight: 650 }}>
        <Typography variant="h3" id="input-slider" gutterBottom>
          Robots on Mars
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={5}>
            <Typography variant="h5" id="input-slider" gutterBottom>
              Input
            </Typography>
            <Item>
              <RobotInput />
            </Item>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="h5" id="input-slider" gutterBottom>
              Output
            </Typography>
            <Item>
              <RobotOutput />
            </Item>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default App;
