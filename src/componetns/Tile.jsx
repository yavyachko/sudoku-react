import React, { useState } from 'react';

const Tile = React.memo(({ value, selectedNumber, selectedValue, handleTileClick }) => {
  const [currentValue, setCurrentValue] = useState(null);

  const handleClick = () => {
    setCurrentValue(selectedNumber);
    handleTileClick(selectedNumber);
  };

  const handleValue = ()=>{
    return
  }

  return (
    value ?
    <div
      className={`tile  ${selectedValue === currentValue ? 'selected' : ''}`}
      onClick={handleValue}
    >
      {value}

    </div>
    :
       <div
      className={`tile  ${selectedValue === currentValue ? 'selected' : ''}`}
      onClick={handleClick}
    >
      {currentValue || value}
    </div>
  );
});

export default Tile;