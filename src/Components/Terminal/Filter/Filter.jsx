import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Tooltip } from '@mui/material';

function Filter({ terminal, selected }) {
  const navigate = useNavigate();

  return (
    <Tooltip title={(terminal.userDesc === undefined || terminal.termName === undefined) ? null : `${terminal.userDesc} - ${terminal.termName}`} arrow>
      <Box sx={{
        position: 'relative',
        margin: '5px 8px 5px 8px',
        border: '1px solid var(--smoke)',
        borderRadius: '5px',
        width: '150px',
        textAlign: 'center',
        ":hover": {
          backgroundColor: '#bef5bd',
          cursor: 'pointer',
        },
      }} 
      onClick={() =>
        navigate(`/terminals/${selected.depCode}/${terminal.filterCode}`)
      }>
        {terminal.linkCount === 1 ? null : <Box sx={{
          position: 'absolute',
          fontWeight: 'bold',
          fontSize: 'smaller',
          color: 'antiquewhite',
          right: 0,
          width: '15px',
          padding: '0 5px 0 5px',
          backgroundColor: 'var(--apple)',
          borderRadius: '0 5px 0 5px',
        }}
        >{terminal.linkCount}</Box>}
        <p>{terminal.filterCode}</p>
      </Box> 
    </Tooltip>
  );
}

export default Filter;
