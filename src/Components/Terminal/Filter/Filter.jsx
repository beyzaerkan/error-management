import React from 'react';

import './Filter.css'

function Filter({ filterCode, linkCount }) {

  return (
      <div className='filter-section'>
        {linkCount === 1 ? null : <div className='link-count'>{linkCount}</div>}
        <p>{filterCode}</p>
      </div>
  );
}

export default Filter;
