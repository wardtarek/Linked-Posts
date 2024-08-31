import { Box, CircularProgress } from '@mui/material';
import React from 'react'

const LoadingPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#e0e0e0",
      }}
    >
      <CircularProgress disableShrink />
    </Box>
  );
}

export default LoadingPage