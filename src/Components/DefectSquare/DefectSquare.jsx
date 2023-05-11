import React, { useContext } from 'react';
import DropdownContent from '../DropdownContent/DropdownContent';
import { DefectEntryContext } from '../../Context';
import { Box } from '@mui/material';

function DefectSquare({ box, handleClick }) {
  const { options, imageRef, setSelectedPart } = useContext(DefectEntryContext);
  const maxX = imageRef.current.offsetLeft + imageRef.current.clientWidth - box.boxWidth;
  const maxY = imageRef.current.offsetTop + imageRef.current.clientHeight - box.boxHeight;
  const constrainedX = Math.max(box.boxX, Math.min(imageRef.current.offsetLeft + box.boxX, maxX));
  const constrainedY = Math.max(box.boxY, Math.min(imageRef.current.offsetTop + box.boxY, maxY));

  return (
    <>
      {
        box.lineX !== -100 && box.lineY !== -100 &&
        <svg style={{ position: 'absolute', top: constrainedY + 40, left: constrainedX + 40, width: '50%', height: '50%' }}>
          <line x1='0' y1='0' x2={box.lineX + "px"} y2={box.lineY + "px"} stroke="red" strokeWidth="2" />
        </svg>
      }
      <Box
        sx={{
          position: 'absolute',
          borderRadius: '5px',
          top: constrainedY,
          left: constrainedX,
          width: box.boxWidth,
          height: box.boxHeight,
          border: `5px solid ${box.boxColor}`,
          color: box.boxColor,
          zIndex: 1,
          '&:hover': {
            cursor: 'pointer',
         }
        }}
        onClick={handleClick}
        >

        <Box
          sx={{
            backgroundColor: 'var(--snow)',
            fontSize: '12px',
            textAlign: 'center',
          }}
        >{box.labelText}</Box>
        {
          box.isDropdownOpen && options && <DropdownContent options={options} setter={setSelectedPart} />
        }
      </Box>
    </>
  )
}

export default DefectSquare;
