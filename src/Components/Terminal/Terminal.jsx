import React from 'react';
import './Terminal.css'
import Filter from './Filter/Filter';

function Terminal({ element }) {

  const filters = element.filterBaseds
  return (
      <tr>
        <td className='section' >({element.shopCode}) {element.depName}</td>
        <td className='filter'>
          {filters.map((element) => {
            return (
              <Filter filterCode={element.filterCode} linkCount={element.linkCount}/>
            )
          })}
          </td> 
      </tr>
  );
}

export default Terminal;
