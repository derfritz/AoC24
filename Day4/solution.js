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

        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];

        return directions.map(([dx, dy]) =>
            charAt(i, j) +
            charAt(i + dx, j + dy) +
            charAt(i + 2 * dx, j + 2 * dy) +
            charAt(i + 3 * dx, j + 3 * dy)
        ).filter(s => s === 'XMAS').length;
    }
    const crossmasFoundAt = (i, j) => {

        if (!(matrix[i] || matrix[i][j])) return 0;
        if (matrix[i][j] !== 'A') return 0;

        const axis1 = charAt(i - 1, j - 1) + charAt(i, j) + charAt(i + 1, j + 1);
        const axis2 = charAt(i - 1, j + 1) + charAt(i, j) + charAt(i + 1, j - 1);

        if ((axis1 === 'MAS' || axis1 === 'SAM') &&
            (axis2 === 'MAS' || axis2 === 'SAM')) return 1;

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
