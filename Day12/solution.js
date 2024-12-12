// source: https://adventofcode.com/2020/day/12
function day12() {

    const input = require('fs').readFileSync('./input.txt', 'utf8').split('\n');
    const matrix = input.map(row => row.split(''));

    const visited = new Set();

    const directions = [
        // n       e       w        s         ne       nw      sw       se
        [-1, 0], [0, 1], [0, -1], [1, 0], [-1, 1], [-1, -1], [1, -1], [1, 1]
    ];

    const withinMatrix = (pos) => pos[0] >= 0 && pos[0] < matrix.length && pos[1] >= 0 && pos[1] < matrix[pos[0]].length;
    const charAt = (pos) => pos && withinMatrix(pos) ? matrix[pos[0]][pos[1]] : '';
    const walk = (pos, previous, plan) => {

        const [x, y] = pos;
        const key = `${x}-${y}`;
        const char = charAt(pos);

        if (previous && charAt(previous) !== charAt(pos)) return;
        if (visited.has(key)) return;

        visited.add(key);

        // get neighbors: if they are the same as the current char -> true
        const [n, e, w, s, ne, nw, sw, se] =
            directions.map(([dx, dy]) => charAt([x + dx, y + dy]) === char);

        // check fences
        const fences = [n, e, w, s].filter(b => !b).length;
        // check corners
        const corners = [
            (!(w || n) || (w && n && !nw)),
            (!(w || s) || (w && s && !sw)),
            (!(e || n) || (e && n && !ne)),
            (!(e || s) || (e && s && !se)),
        ].filter(Boolean).length;

        plan.set(key, {corners, fences});

        return walk([x + 1, y], pos, plan) || walk([x - 1, y], pos, plan) ||
            walk([x, y + 1], pos, plan) || walk([x, y - 1], pos, plan);
    }
    const plot = (pos) => {
        const plan = new Map();
        walk(pos, null, plan);

        let fences = 0;
        let corners = 0;

        plan.forEach((value, _key) => {
            fences += value.fences;
            corners += value.corners;
        })

        return {size: plan.size, fences, corners};
    }

    let cost = 0;
    let costDeducted = 0
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (!visited.has(`${i}-${j}`)) {
                const estimate = plot([i, j]);
                cost += estimate.size * estimate.fences;
                costDeducted += estimate.size * estimate.corners;
            }
        }
    }
    console.log('D12P1', cost);
    console.log('D12P2', costDeducted);
}

day12();
