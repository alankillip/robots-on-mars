import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { RobotInput } from "./components/robot-input";

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
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Item>
              <RobotInput />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>xs</Item>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default App;
