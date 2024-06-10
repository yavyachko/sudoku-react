export default class SudokuField {
    initialTable;
    constructor(n = 3) {
        this.n = n;
        this.table = this.generateInitialTable();
        this.initialTable = this.table.map(row => row.slice());
    }

    generateInitialTable() {
        const table = [];
        for (let i = 0; i < this.n * this.n; i++) {
            table[i] = [];
            for (let j = 0; j < this.n * this.n; j++) {
                table[i][j] = ((i * this.n + Math.floor(i / this.n) + j) % (this.n * this.n) + 1);
            }
        }
        return table;
    }

    showTable() {
        for (let i = 0; i < this.n * this.n; i++) {
            console.log(this.table[i]);
        }
    }

    #transpose() {
        this.table.map((_, i) => this.table.map(row => row[i]));
    }

    #swapRows() {
        const area = Math.floor(Math.random() * this.n);
        const line1 = Math.floor(Math.random() * this.n);
        const N1 = area * this.n + line1;

        let line2;
        do {
            line2 = Math.floor(Math.random() * this.n);
        } while (line1 === line2);

        const N2 = area * this.n + line2;

        [this.table[N1], this.table[N2]] = [this.table[N2], this.table[N1]];
    }

    #swapColumns() {
        this.#transpose();
        this.#swapRows();
        this.#transpose();
    }

    #swapGroupRows() {
        let area1 = Math.floor(Math.random() * this.n);
        let area2;
        do {
            area2 = Math.floor(Math.random() * this.n);
        } while (area1 === area2);

        for (let i = 0; i < this.n; i++) {
            let N1 = area1 * this.n + i;
            let N2 = area2 * this.n + i;
            [this.table[N1], this.table[N2]] = [this.table[N2], this.table[N1]];
        }
    }

    #swapGroupColumns() {
        this.#transpose();
        this.#swapGroupRows();
        this.#transpose();
    }

    randomizeField(n = 10) {
        const functions = [
            this.#transpose,
            this.#swapRows,
            this.#swapColumns,
            this.#swapGroupRows,
            this.#swapGroupColumns
        ];

        for (let i = 0; i < n; i++) {
            let functionID = Math.floor(Math.random() * functions.length);
            functions[functionID].call(this);
        }
    }

    resetField() {
        this.table = this.initialTable.map(row => row.slice());
    }

    #hasSameValues(arr) {
        const uniqueValues = new Set(arr.filter((v) => v !== null && v !== 0));
        return uniqueValues.size === arr.length;
    }

    hasErrors() {
        for (let row of this.table) {
            if (this.#hasSameValues(row)) {
                return true;
            }
        }

        for (let j = 0; j < this.n; j++) {
            const column = this.table.map(row => row[j]);
            if (this.#hasSameValues(column)) {
                return true;
            }
        }

        for (let i = 0; i < this.n; i += 3) {
            for (let j = 0; j < this.n; j += 3) {
                const group = [];
                for (let row = i; row < i + 3; row++) {
                    for (let col = j; col < j + 3; col++) {
                        group.push(this.table[row][col]);
                    }
                }
                console.log(group)
                if (this.#hasSameValues(group)) {
                    return true;
                }
            }
        }

        return false;
    }

    removeCells(numCellsToRemove) {
        const fieldSize = this.table.length * this.table[0].length;
        const cellIndices = Array.from({ length: fieldSize }, (_, i) => i);

        for (let i = cellIndices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cellIndices[i], cellIndices[j]] = [cellIndices[j], cellIndices[i]];
        }

        for (let i = 0; i < numCellsToRemove; i++) {
            const index = cellIndices[i];
            const row = Math.floor(index / this.table[0].length);
            const col = index % this.table[0].length;
            this.table[row][col] = 0;
        }
    }

    getFieldValues() {
        const fieldValues = [];

        for (const row of this.table) {
            for (const value of row) {
                fieldValues.push(value);
            }
        }

        return fieldValues;
    }

    generateSudokuField(difficulty = 30) {
        this.generateInitialTable();
        this.randomizeField(100);
        this.initialTable = structuredClone(this.table);
        this.removeCells(difficulty);
    }
}