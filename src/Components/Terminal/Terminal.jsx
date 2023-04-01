import React from 'react';
import Filter from './Filter/Filter';
import { TableRow, TableCell, Box, Typography } from '@mui/material';

function Terminal({ element }) {

  const filters = element.filterBaseds;
  return (
    <TableRow>
      <TableCell>
        <Typography sx={{color: 'var(--apple)', textAlign: 'center'}}>
        ({element.shopCode}) {element.depName}
        </Typography>
        </TableCell>
      <TableCell>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          {filters.map((item, index) => {
            return (
              <Filter key={index} terminal={item} selected={element} />
            )
          })}
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default Terminal;
