import React, { useState, useEffect, forwardRef } from 'react';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { TableCell, Box, Stack } from '@mui/material';

const Defect = forwardRef(({ defectItem, deleteDefect, nrReasonList }, ref) => {
  const [textColor, setTextColor] = useState('');

  const calculateBrightness = (color) => {
    const [r, g, b] = color.match(/\w\w/g).map(x => parseInt(x, 16));
    return Math.round(((r * 299) + (g * 587) + (b * 114)) / 1000);
  }

  useEffect(() => {
    const brightness = calculateBrightness(defectItem.rgbCode);
    const newTextColor = brightness > 128 ? '#000' : '#FFF';
    setTextColor(newTextColor);
  }, [defectItem.rgbCode])

  return (
    <>
      <TableCell>{defectItem.depCode}</TableCell>
      <TableCell>{defectItem.bodyNo}</TableCell>
      <TableCell>{defectItem.assyNo}</TableCell>
      <TableCell>{defectItem.vinNo}</TableCell>
      <TableCell><Box sx={{ background: defectItem.rgbCode, borderRadius: '5px', color: textColor }}>{defectItem.colorExtCode}</Box></TableCell>
      <TableCell>{defectItem.modelCode}</TableCell>
      <TableCell>{defectItem.localId}</TableCell>
      <TableCell><a href="url" style={{color: 'var(--apple)' }}>{defectItem.partName}</a></TableCell>
      <TableCell>{ }</TableCell>
      <TableCell>{ }</TableCell>
      <TableCell>{ }</TableCell>
      <TableCell>{ }</TableCell>
      <TableCell>{defectItem.defectName}</TableCell>
      <TableCell>{defectItem.defrankCode}</TableCell>
      <TableCell>{defectItem.formattedDefectHour}</TableCell>
      <TableCell>{defectItem.defectType}</TableCell>
      <TableCell>{defectItem.defrespName}</TableCell>
      <TableCell>{ }</TableCell>
      <TableCell>
        <select>
          {
            nrReasonList.map((nrReason, index) => {
              return (
                <option key={index} value={nrReason.nrId === defectItem.nrReasonId}>{nrReason.nrReasonAbb}</option>
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
          <Button variant='danger' size="small" onClick={() => deleteDefect(defectItem)}><FontAwesomeIcon icon={faTrash} /></Button>
        </Stack>
      </TableCell>
    </>
  );
});

export default Defect;
