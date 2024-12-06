const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

function day6() {
    const fs = require('fs');
    const input = fs.readFileSync('./input.txt', 'utf-8');

    const matrix = input.split('\n').map(row => row.split(''));

    const directions = {
        up: {x: -1,y: 0, turn: 'right', symbol: '|'},
        right: {x: 0,y: 1, turn: 'down', symbol: '-'},
        down: {x: 1,y: 0, turn: 'left', symbol: '|'},
        left: {x: 0,y: -1, turn: 'up', symbol: '-'},
    }

    const caret = {
        x: matrix.findIndex(r => r.includes('^')),
        y: matrix[matrix.findIndex(r => r.includes('^'))].findIndex(char => char === '^'),
        steps: 1,
        virginSteps: 1,
        currentDirection: 'up',
    };

    console.log('caret', caret);

    while (true) {

        const x = caret.x + directions[caret.currentDirection].x;
        const y = caret.y + directions[caret.currentDirection].y;

        // console.log('moving to', x, y, 'direction', caret.currentDirection, 'steps', caret.steps);
        if (matrix[x] && matrix[x][y]) {

            if (matrix[x] && matrix[x][y] === '#') {
                caret.currentDirection = directions[caret.currentDirection].turn;
                continue;
            }

            matrix[caret.x][caret.y] = `${directions[caret.currentDirection].symbol}`;
            caret.y = y;
            caret.x = x;
            caret.steps++;

            if (matrix[x][y] === '.') caret.virginSteps++;
            matrix[x][y] = 'o';

            continue;
        }
        break;
    }

    matrix.forEach(row => console.log(row.join(' ')));
    console.log('caret', caret);

    console.log('D6P1', caret.virginSteps);
}

day6();
