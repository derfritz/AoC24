// source: https://adventofcode.com/2020/day/12
function day12() {

    const input = require('fs').readFileSync('./input.txt', 'utf8').split('\n');
    const matrix = input.map(row => row.split(''));

    const visited = new Set();
    const directions = [
        // n       e       w        s        ne       nw       sw       se
        [-1, 0], [0, 1], [0, -1], [1, 0], [-1, 1], [-1, -1], [1, -1], [1, 1]
    ];
    const getNeighbors = (pos) => directions.map(([dx, dy]) => charAt( [pos[0] + dx, pos[1] + dy]) === charAt(pos));
    const withinMatrix = (pos) => pos[0] >= 0 && pos[0] < matrix.length && pos[1] >= 0 && pos[1] < matrix[pos[0]].length;
    const charAt = (pos) => pos && withinMatrix(pos) ? matrix[pos[0]][pos[1]] : '';
    const toKey = (pos) => `${pos[0]}-${pos[1]}`;
    const walk = (pos, previous, plan) => {

        const [x, y] = pos;
        const key = `${x}-${y}`;
        const char = charAt(pos);

        if (previous && charAt(previous) !== char) return; // out of bounds
        if (visited.has(key)) return; // already visited

        // get neighbors: if they are the same as the current char -> true
        const [n, e, w, s, ne, nw, sw, se] = getNeighbors(pos);
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
        visited.add(key);

        // walk: n, e, w, s
        [directions[0], directions[1], directions[2], directions[3]]
            .forEach(([dx, dy]) => walk([x + dx, y + dy], pos, plan));
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
    let costDeducted = 0;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {

            if (!visited.has(toKey([i, j]))) {
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
