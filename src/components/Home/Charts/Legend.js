import React, { Component } from 'react';
import './Legend.css';

class Legend extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { data } = this.props;
    return (
      <li
        className='chart-legend-list'
      >
        <span className='chart-legend-category'>{data.name}</span>
        <span className='chart-legend-cost'>{data.cost}</span>
        <span className='chart-legend-percentage'>{data.percentage}</span>
      </li>
    )
  }
}

export default Legend;