import React from 'react';
import { Skeleton } from '@mui/material';

const SkeletonComponent = () => {
  return (
    <div>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </div>
  )
};

export default SkeletonComponent;
