import React, { useState, useEffect } from 'react';
import { useHover } from '../utils/hooks';
const DataBlocks = () => {
  const [active, setActive] = useState('0');
  const handleSetActive = (id: String) => {
    setActive(id.toString());
  };
  return (
    <div>
      <DataBlock2 />

      <DataBlock1 />
    </div>
  );
};

export default DataBlocks;

const DataBlock1 = () => {
  const [hoverRef, isHovered] = useHover();
  const id = 1;
  return (
    <div ref={hoverRef as any}>
      {isHovered ? '😁' : '☹️'}
      <p>hover me 1</p>
    </div>
  );
};

const DataBlock2 = () => {
  const [hoverRef, isHovered] = useHover();
  const id = 2;
  return (
    <div ref={hoverRef as any}>
      {isHovered ? 'hovered!' : '!hovered️'}
      <p>hover me 2</p>
    </div>
  );
};

// https://linguinecode.com/post/get-current-element-react-onmouseover-or-onmouseenter
