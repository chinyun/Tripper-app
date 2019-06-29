import React, { Component } from 'react';
import * as d3 from 'd3';
import './Charts.css';

const totalAmount = 12000;
const createChart = ( ) => {
  const data = [{ 
    name: '交通', cost: 3000, percentage: '25.5%'
  }, { 
    name: '食物', cost: 2000, percentage: '16%'
  }, { 
    name: '住宿', cost: 5000, percentage: '42%'
  }, {
    name: '票券', cost: 500, percentage: '4%'
  }, {
    name: '購物', cost: 1500, percentage: '12.5%'
  }];

  const dims = { height: 100, width: 220, radius: 80 };
  const cent = { x: (dims.width / 2 -20), y: (dims.height / 2 + 50) };
  
  const svg = d3.select('#chart-area')
  .append('svg')
    .attr('width', dims.width + 300)
    .attr('height', dims.height + 100);

  const graph = svg.append('g')
    .attr('transform', `translate(${cent.x}, ${cent.y})`);

// pie chart
  const pie = d3.pie()
    .sort(null)
    .value(d => d.cost);

  const arcPath = d3.arc()
    .outerRadius(dims.radius)
    .innerRadius(dims.radius / 2.25);

  // const colour = d3.scaleOrdinal(['#8570F7','#D16EE6','#AE67E8','#D19DFF','#6353BC']);
  const colour = d3.scaleOrdinal(['#FBC2A2','#7BF7C9','#F9FCBC','#ECA9FF','#E488FC']);
  // const colour = d3.scaleOrdinal(d3['schemeSet3']);

  const legendGroup = svg.append('g')
    .attr('transform', `translate(${dims.width + 65}, 32)`);

  // update function
  const update = (data) => {
    colour.domain(data.map(d => d.name));
    
    //update legend
    data.forEach((d, i) => {
      const legend = legendGroup.append('g')
        .attr('transform', 'translate(-85, '+ (i * 32) +')');
      legend.append('circle')
        .attr('r', 6)
        .attr('cx', 10)
        .attr('cy', 5)
        .attr('stroke', '#FEFEFE')
        .attr('stroke-width', 1)
        .attr('fill', colour(d.name));
      legend.append('text')
        .attr('x', 30)
        .attr('y', 10)
        .attr('text-anchor', 'start')
        .attr('class', 'chart-legend-category')
        .attr('fill', 'white')
        .text(d.name);
      legend.append('text')
        .attr('x', 160)
        .attr('y', 10)
        .attr('text-anchor', 'end')
        .attr('fill', 'white')
        .attr('class', 'chart-legend-cost')
        .text(d.cost);
      legend.append('text')
        .attr('x', 250)
        .attr('y', 10)
        .attr('text-anchor', 'end')
        .attr('fill', 'white')
        .attr('class', 'chart-legend-percentage')
        .text(d.percentage);
    }); 

    // update paths(donut chart)
    const paths = graph.selectAll('path')
      .data(pie(data));

    paths.enter()
      .append('path')
        .attr('class', 'arc')
        .attr('d', arcPath)
        .attr('fill', d => colour(d.data.name));
  };
  update(data);
};

class Charts extends Component {
  constructor() {
    super();
    this.state = {};
  };

  componentDidMount = () => {
    createChart();
  };

  render() {
    return (
      <div className='charts-container'>
        <p className='charts-title'>Total</p>
        <div className='charts-wrapper'>
          <div id='chart-area' className='chart-area'>
          </div>
          <div className='chart-total-amount'>
            <p className='chart-total-amount-text'> 合計 {totalAmount} (100%)</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Charts;