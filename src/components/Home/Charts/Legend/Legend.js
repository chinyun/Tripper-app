import React from 'react';
import './Legend.css';

const Legend  = ({ data }) => {
  return (
    <li className='chart-legend-list'>
      <span className='chart-legend-category'>{data.name}</span>
      <span className='chart-legend-cost'>{data.cost}</span>
      <span className='chart-legend-percentage'>{data.percentage}</span>
    </li>
  )
}

export default Legend;