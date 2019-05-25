import React from 'react';

const Days = ({day}) => {
  const dayValue = `Day${day.counts}`
  return (
    <option value ={dayValue}>
      {dayValue}
    </option>
  );
};

export default Days;

