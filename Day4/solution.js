function day4() {

    const fs = require('fs');
    const input = fs.readFileSync('./input.txt', 'utf8');

    const matrix = input.split('\n').map(row => row.split(''));

    let pt1Count = 0;
    let pt2Count = 0;

    const charAt = (i, j) => ((matrix[i] && matrix[i][j])) ? matrix[i][j] : '';

    const xmasFoundAt = (i, j) => {

        if (!(matrix[i] || matrix[i][j])) return 0;
        if (matrix[i][j] !== 'X') return 0;

        const forward = `${charAt(i, j)}${charAt(i, j + 1)}${charAt(i, j + 2)}${charAt(i, j + 3)}`;
        const backward = `${charAt(i, j)}${charAt(i, j - 1)}${charAt(i, j - 2)}${charAt(i, j - 3)}`;
        const down = `${charAt(i, j)}${charAt(i + 1, j)}${charAt(i + 2, j)}${charAt(i + 3, j)}`;
        const up = `${charAt(i, j)}${charAt(i - 1, j)}${charAt(i - 2, j)}${charAt(i - 3, j)}`;
        const diagonalDownRight = `${charAt(i, j)}${charAt(i + 1, j + 1)}${charAt(i + 2, j + 2)}${charAt(i + 3, j + 3)}`;
        const diagonalDownLeft = `${charAt(i, j)}${charAt(i + 1, j - 1)}${charAt(i + 2, j - 2)}${charAt(i + 3, j - 3)}`;
        const diagonalUpRight = `${charAt(i, j)}${charAt(i - 1, j + 1)}${charAt(i - 2, j + 2)}${charAt(i - 3, j + 3)}`;
        const diagonalUpLeft = `${charAt(i, j)}${charAt(i - 1, j - 1)}${charAt(i - 2, j - 2)}${charAt(i - 3, j - 3)}`;

        return [forward, backward, down, up, diagonalDownLeft, diagonalUpLeft, diagonalDownRight, diagonalUpRight]
            .filter(s => s === 'XMAS').length;
    }
    const crossmasFoundAt = (i, j) => {

        if (!(matrix[i] || matrix[i][j])) return 0;
        if (matrix[i][j] !== 'A') return 0;

        const axis1 = `${charAt(i - 1, j - 1)}${charAt(i, j)}${charAt(i + 1, j + 1)}`;
        const axis2 = `${charAt(i - 1, j + 1)}${charAt(i, j)}${charAt(i + 1, j - 1)}`;

        if ([axis1, axis1.split('').reverse().join(''),
            axis2, axis2.split('').reverse().join('')]
            .filter(s => s === 'MAS').length === 2) return 1;

        return 0;
    }
    
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {

            pt1Count += xmasFoundAt(i, j, matrix);
            pt2Count += crossmasFoundAt(i, j, matrix);
        }
    }
    console.log('[D4P1]', pt1Count);
    console.log('[D4P2]', pt2Count);
}

day4();
