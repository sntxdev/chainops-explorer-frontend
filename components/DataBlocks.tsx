import React, { useState, useEffect } from 'react';
import { useHover } from '../utils/hooks';

const DataBlocks = () => {
  const [active, setActive] = useState<any>();
  const handleHover = (id: String) => {
    setActive(id);
  };
  useEffect(() => console.log(active));
  return (
    <div>
      <DataBlock1 onHover={handleHover} />
      <DataBlock2 onHover={handleHover} />
    </div>
  );
};

export default DataBlocks;

const DataBlock1 = ({ onHover }: any) => {
  const id = 1;
  return (
    <p onMouseEnter={() => onHover(id)} onMouseLeave={() => onHover(0)}>
      hover me 1
    </p>
  );
};

const DataBlock2 = ({ onHover }: any) => {
  const id = 2;
  return (
    <p onMouseEnter={() => onHover(id)} onMouseLeave={() => onHover(0)}>
      hover me 2
    </p>
  );
};

// https://linguinecode.com/post/get-current-element-react-onmouseover-or-onmouseenter
