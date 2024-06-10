import React, { useState } from "react";

export default function NumberPicker({ getNumber }) {
  const [selectedNumber, setSelectedNumber] = useState(null);

  function handleNumberClick(value) {
    setSelectedNumber(value);
    getNumber(value);
  }

  return (
    <div className="numbers">
      <div
        className={`number ${selectedNumber === 1 ? "selected" : ""}`}
        onClick={() => handleNumberClick(1)}
      >
        1
      </div>
      <div
        className={`number ${selectedNumber === 2 ? "selected" : ""}`}
        onClick={() => handleNumberClick(2)}
      >
        2
      </div>
      <div
        className={`number ${selectedNumber === 3 ? "selected" : ""}`}
        onClick={() => handleNumberClick(3)}
      >
        3
      </div>
      <div
        className={`number ${selectedNumber === 4 ? "selected" : ""}`}
        onClick={() => handleNumberClick(4)}
      >
        4
      </div>
      <div
        className={`number ${selectedNumber === 5 ? "selected" : ""}`}
        onClick={() => handleNumberClick(5)}
      >
        5
      </div>
      <div
        className={`number ${selectedNumber === 6 ? "selected" : ""}`}
        onClick={() => handleNumberClick(6)}
      >
        6
      </div>
      <div
        className={`number ${selectedNumber === 7 ? "selected" : ""}`}
        onClick={() => handleNumberClick(7)}
      >
        7
      </div>
      <div
        className={`number ${selectedNumber === 8 ? "selected" : ""}`}
        onClick={() => handleNumberClick(8)}
      >
        8
      </div>
      <div
        className={`number ${selectedNumber === 9 ? "selected" : ""}`}
        onClick={() => handleNumberClick(9)}
      >
        9
      </div>

    </div>
  );
}