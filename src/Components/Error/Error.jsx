import React, { useState, useEffect, forwardRef } from 'react';
import { useFetch } from '../../Hooks';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

import './Error.css'

const  Error = forwardRef(( props, ref ) => {
  const { errors, loading, error } = useFetch();
  const [nrReasonList, setNrReasonList] = useState([]);

  const reasonList = async () => {
    let updatedNrReasonList = errors[0].nrReasonList;
    setNrReasonList([...updatedNrReasonList]);
  }

  useEffect(() => {
    reasonList();
  }, [errors]);

  return (
    <tr className='error-list-item' ref={ref}>
      <td>{props.errorItem.depCode}</td>
      <td>{props.errorItem.bodyNo}</td>
      <td>{props.errorItem.assyNo}</td>
      <td>{props.errorItem.vinNo}</td>
      <td><div className='color-section' style={{ background: props.errorItem.rgbCode }}>{props.errorItem.colorExtCode}</div></td>
      <td>{props.errorItem.modelCode}</td>
      <td>{props.errorItem.localId}</td>
      <td><a href="url">{props.errorItem.partName}</a></td>
      <td>{ }</td>
      <td>{ }</td>
      <td>{ }</td>
      <td>{ }</td>
      <td>{props.errorItem.defectName}</td>
      <td>{props.errorItem.defrankCode}</td>
      <td>{props.errorItem.formattedDefectHour}</td>
      <td>{props.errorItem.defectType}</td>
      <td>{props.errorItem.defrespName}</td>
      <td>{ }</td>
      <td>
        <select>
          {
            nrReasonList.map((nrReason, index) => {
              return (
                <option key={index} selected={nrReason.nrId === props.errorItem.nrReasonId}>{nrReason.nrReasonAbb}</option>
              )
            })
          }
        </select>
      </td>
      <td>
        <Button variant='dark' size="full" >
          <FontAwesomeIcon icon={faFloppyDisk} />
        </Button>
      </td>
      <td>
        <div className='operation-section'>
          <Button variant='danger' size="full"><FontAwesomeIcon icon={faPen} /></Button>
          <Button variant='danger' size="full"><FontAwesomeIcon icon={faTrash} /></Button>
        </div>
      </td>
    </tr>
  );
});

export default Error;
