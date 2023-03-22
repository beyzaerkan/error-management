
import React, { useState, useRef, useEffect } from 'react';
import { useMouse } from '../../Hooks/index';
import ErrorSquare from '../ErrorSquare/ErrorSquare';
import './SubImage.css';

function SubImage({ error }) {
  const imageRef = useRef(null);

  return (
    <div className='image-mapper'>
      <img src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" ref={imageRef} />
      <ErrorSquare
        coord={{ x: error.boxX, y: error.boxY }}
        size={{ width: error.boxWidth, height: error.boxHeight }}
        color={error.boxColor}
        labelText={error.labelText}
        imageRef={imageRef}
      />
    </div>
  )
}

export default SubImage;
