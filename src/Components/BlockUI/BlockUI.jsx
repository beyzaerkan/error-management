import React from 'react';
import { Box } from '@mui/material';

const BlockUI = ({ blocking = false }) => {
  return (
    !blocking ? ("") : (
      <Box className="block-ui-container" sx={{
        position: 'absolute',
        zIndex: 5,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        height: '100%',
        width: '100%',
        minHeight: '2em',
        cursor: 'wait',
        overflow: 'hidden',
        ":focus": {
          outline: 'none',
        }
      }}>
        <Box className="block-ui-overlay" sx={{
          width: '100%',
          height: '100%',
          opacity: '0.75',
          filter: 'alpha(opacity=50)',
          backgroundColor: 'rgb(184, 184, 184)',
        }} />
      </Box >
    )
  );
};

export default BlockUI;
