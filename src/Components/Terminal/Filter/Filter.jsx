import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Filter.css'

function Filter({ terminal, selected }) {
  const navigate = useNavigate();

  return (
    <div className='tooltip'>
      <div className='filter-section' onClick={() =>
        navigate(`/terminals/${selected.depCode}/${terminal.filterCode}`)
      }>
        {terminal.linkCount === 1 ? null : <div className='link-count'>{terminal.linkCount}</div>}
        <p>{terminal.filterCode}</p>
      </div>
      {terminal.userDesc === undefined || terminal.termName === undefined ? null : <span class="tooltip-text">{terminal.userDesc} - {terminal.termName}</span> }
    </div>
  );
}

export default Filter;
