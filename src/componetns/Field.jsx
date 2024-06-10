import React, { useState, useEffect, useCallback } from "react";
import SudokuField from "../script/FieldClass";

const SudokuGame = () => {
  const [sudokuField, setSudokuField] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [difficulty, setDifficulty] = useState(30);
  const [hasError, setHasError] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  //генерация и рестарт

  const handleRestart = () => {
    setSudokuField(null);
    setSelectedCell(null);
    setDifficulty(30);
    setHasError(false);
    generateNewField();
    document.body.style.overflow = "auto";
  };

  const generateNewField = useCallback(() => {
    const newSudokuField = new SudokuField();
    newSudokuField.generateSudokuField(difficulty);
    setSudokuField(newSudokuField);
    setHasError(hasErrors(newSudokuField.table));
  }, [difficulty]);

  useEffect(() => {
    generateNewField();
  }, [generateNewField]);

  //покахать решение

  const handleToggleSolution = () => {
    setShowSolution(!showSolution);
  };

  //ошибки

  function hasErrors(table) {
    for (let i = 0; i < table.length; i++) {
      if (hasSameValues(table[i])) {
        return true;
      }
    }

    for (let i = 0; i < table.length; i++) {
      const column = table.map((row) => row[i]);
      if (hasSameValues(column)) {
        return true;
      }
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const section = [];
        for (let row = i * 3; row < i * 3 + 3; row++) {
          for (let col = j * 3; col < j * 3 + 3; col++) {
            section.push(table[row][col]);
          }
        }
        if (hasSameValues(section)) {
          return true;
        }
      }
    }

    return false;
  }

  function hasSameValues(arr) {
    const uniqueValues = new Set(arr.filter((v) => v !== null && v !== 0));
    return (
      uniqueValues.size !== arr.filter((v) => v !== null && v !== 0).length
    );
  }

  //выигрыш

  const checkWin = () => {
    if (isSudokuFilled(sudokuField.table) && !hasErrors(sudokuField.table)) {
      alert("Congratulations! You've won the game!");
      handleRestart();
    }
  };

  function isSudokuFilled(table) {
    for (let row of table) {
      if (row.includes(0)) {
        return false;
      }
    }
    return true;
  }

  //хэндлеры

  const handleNumberClick = (value) => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      const newTable = [...sudokuField.table];
      newTable[row][col] = value;
      const newSudokuField = { ...sudokuField, table: newTable };
      setSudokuField(newSudokuField);
      setHasError(hasErrors(newSudokuField.table));
      checkWin();
    }
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(parseInt(event.target.value));
  };

  const handleCellClick = (row, col, e) => {
    setSelectedCell({ row, col });
    checkWin();
  };

  if (hasError) {
    document.body.style.overflow = "hidden";
  }

  if (!sudokuField) return null;

  return (
    <div>
      <h2>Sudoku</h2>
      <div className={`field ${showSolution ? "solution" : ""}`}>
        {(!showSolution ? sudokuField.table : sudokuField.initialTable).map(
          (row, rowIndex) => (
            <div key={rowIndex} className="quadrant">
              {row.map((value, colIndex) =>
                value ? (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`tile ${value === 0 ? "blank" : ""} ${
                      selectedCell &&
                      selectedCell.row === rowIndex &&
                      selectedCell.col === colIndex
                        ? "selected"
                        : ""
                    } ${hasError ? "error" : ""}`}
                  >
                    {value !== 0 ? value : ""}
                  </div>
                ) : (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`tile ${value === 0 ? "blank" : ""} ${
                      selectedCell &&
                      selectedCell.row === rowIndex &&
                      selectedCell.col === colIndex
                        ? "selected"
                        : ""
                    } ${hasError ? "error" : ""}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {value !== 0 ? value : ""}
                  </div>
                )
              )}
            </div>
          )
        )}
      </div>
      <div className="numbers">
        {Array.from({ length: 9 }, (_, i) => i + 1).map((value) => (
          <div
            key={value}
            className="number"
            onClick={() => handleNumberClick(value)}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="difficulty">
        Difficulty:
        <input
          type="range"
          min="0"
          max="50"
          value={difficulty}
          onChange={handleDifficultyChange}
        />
        {difficulty}
      </div>
      <div className="buttonBlock">
        <button onClick={handleToggleSolution}>
          {showSolution ? "Show Original" : "Show Solution"}
        </button>
        <button onClick={generateNewField}>Generate New</button>
      </div>
      {hasError && (
        <div className="error-message">
          <div className="game-over">
            GAME OVER
            <button className="restart" onClick={handleRestart}>
              RESTART
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SudokuGame;
