import React, { useState, useEffect, forwardRef } from 'react';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { TableCell, Box, Stack } from '@mui/material';

const Error = forwardRef(({ errorItem, deleteError, nrReasonList }, ref) => {
  const [textColor, setTextColor] = useState('');

  const calculateBrightness = (color) => {
    const [r, g, b] = color.match(/\w\w/g).map(x => parseInt(x, 16));
    return Math.round(((r * 299) + (g * 587) + (b * 114)) / 1000);
  }

  useEffect(() => {
    const brightness = calculateBrightness(errorItem.rgbCode);
    const newTextColor = brightness > 128 ? '#000' : '#FFF';
    setTextColor(newTextColor);
  }, [errorItem.rgbCode])

  return (
    <>
      <TableCell>{errorItem.depCode}</TableCell>
      <TableCell>{errorItem.bodyNo}</TableCell>
      <TableCell>{errorItem.assyNo}</TableCell>
      <TableCell>{errorItem.vinNo}</TableCell>
      <TableCell><Box sx={{ background: errorItem.rgbCode, borderRadius: '5px', color: textColor }}>{errorItem.colorExtCode}</Box></TableCell>
      <TableCell>{errorItem.modelCode}</TableCell>
      <TableCell>{errorItem.localId}</TableCell>
      <TableCell><a href="url" style={{color: 'var(--apple)' }}>{errorItem.partName}</a></TableCell>
      <TableCell>{ }</TableCell>
      <TableCell>{ }</TableCell>
      <TableCell>{ }</TableCell>
      <TableCell>{ }</TableCell>
      <TableCell>{errorItem.defectName}</TableCell>
      <TableCell>{errorItem.defrankCode}</TableCell>
      <TableCell>{errorItem.formattedDefectHour}</TableCell>
      <TableCell>{errorItem.defectType}</TableCell>
      <TableCell>{errorItem.defrespName}</TableCell>
      <TableCell>{ }</TableCell>
      <TableCell>
        <select>
          {
            nrReasonList.map((nrReason, index) => {
              return (
                <option key={index} selected={nrReason.nrId === errorItem.nrReasonId}>{nrReason.nrReasonAbb}</option>
              )
            })
          }
        </select>
      </TableCell>
      <TableCell>
        <Button variant='dark' size="small" >
          <FontAwesomeIcon icon={faFloppyDisk} />
        </Button>
      </TableCell>
      <TableCell>
        <Stack direction='row'>
          <Button variant='danger' size="small"><FontAwesomeIcon icon={faPen} /></Button>
          <Button variant='danger' size="small" onClick={() => deleteError(errorItem)}><FontAwesomeIcon icon={faTrash} /></Button>
        </Stack>
      </TableCell>
    </>
  );
});

export default Error;
