import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        '& > :not(style)': {
          m: 1,
          padding: 10,
          width: '100%',
          height: '100%',
        },
      }}

    >
      <Paper elevation={3} />
    </Box>
  );
}

export default App;
