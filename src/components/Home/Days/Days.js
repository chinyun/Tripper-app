import React from 'react';

const Days = ({day}) => {
  return (
    <option value ={day.id}>
      {day.name}
    </option>
  );
};

export default Days;

