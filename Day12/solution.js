// source: https://adventofcode.com/2020/day/12
function day12() {

    const input = require('fs').readFileSync('./input.txt', 'utf8').split('\n');
    const matrix = input.map(row => row.split(''));

    const visited = new Set();

    const withinMatrix = (pos) => pos[0] >= 0 && pos[0] < matrix.length && pos[1] >= 0 && pos[1] < matrix[pos[0]].length;
    const charAt = (pos) => pos && withinMatrix(pos) ? matrix[pos[0]][pos[1]] : '';
    const walk = (pos, previous, plan) => {

        const [x, y] = pos;
        const key = `${x}-${y}`;

        if (previous && charAt(previous) !== charAt(pos)) return;
        if (visited.has(key)) return;

        visited.add(key);

        const down = charAt([x + 1, y]) === charAt(pos) ? 0 : 1;
        const right = charAt([x, y + 1]) === charAt(pos) ? 0 : 1;
        const up = charAt([x - 1, y]) === charAt(pos) ? 0 : 1;
        const left = charAt([x, y - 1]) === charAt(pos) ? 0 : 1;
        const upRight = charAt([x - 1, y + 1]) === charAt(pos) ? 0 : 1;
        const upLeft = charAt([x - 1, y - 1]) === charAt(pos) ? 0 : 1;
        const downRight = charAt([x + 1, y + 1]) === charAt(pos) ? 0 : 1;
        const downLeft = charAt([x + 1, y - 1]) === charAt(pos) ? 0 : 1;

        // check corners
        let corners = 0;

        if (left + up === 2 || (left + up === 0 && upLeft)) corners++;
        if (left + down === 2 || (left + down === 0 && downLeft)) corners++;
        if (right + up === 2 || (right + up === 0 && upRight)) corners++;
        if (right + down === 2 || (right + down === 0 && downRight)) corners++;

        const fences = down + right + up + left;
        plan.set(key, {corners, fences});

        return walk([x + 1, y], pos, plan) || walk([x - 1, y], pos, plan) || walk([x, y + 1], pos, plan) || walk([x, y - 1], pos, plan);
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

        return {size: plan.size, fences,  corners};
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
