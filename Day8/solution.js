// Source: https://adventofcode.com/2020/day/8
function day8() {

    const input = require('fs').readFileSync('./input.txt', 'utf-8');
    const matrix = input.split('\n')
        .filter(row => row.length > 0)
        .map(row => row.split(''));

    const antennas = {}, antiNodes = {}, antiNodesResonance = {};
    const withinMatrix = (i, j) => (matrix[i] && matrix[i][j]);
    const registerAntiNodes = (current, next) => {

        const [cx, cy] =  current;
        const [nx, ny] =  next;
        const [dx, dy] = [nx - cx, ny - cy];

        if (withinMatrix(cx - dx, cy- dy)) antiNodes[`${cx - dx},${cy- dy}`] = true;
        if (withinMatrix(nx + dx, ny + dy)) antiNodes[`${nx + dx},${ny + dy}`] = true;
    }
    const registerAntiNodesResonance = (current, next) => {

        let [cx, cy] =  current;
        let [nx, ny] =  next;
        const [dx, dy] = [nx - cx, ny - cy];

        while (withinMatrix(cx , cy)) {
            antiNodesResonance[`${cx},${cy}`] = true;
            cx -= dx;
            cy -= dy;
        }
        while (withinMatrix(nx , ny)) {
            antiNodesResonance[`${nx},${ny}`] = true;
            nx += dx;
            ny += dy;
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] !== '.') (antennas[matrix[i][j]] ??= []).push([i, j]);
        }
    }

    Object.keys(antennas).filter(key => antennas[key]?.length > 1)
        .forEach(key => {

            for (let i = 0; i < antennas[key].length - 1; i++) {
                for (let j = i + 1; j < antennas[key].length; j++) {
                    registerAntiNodes(antennas[key][i], antennas[key][j]);
                    registerAntiNodesResonance(antennas[key][i], antennas[key][j]);
                }
            }
        });

    console.log('[D8P1]', Object.keys(antiNodes).length);
    console.log('[D8P2]', Object.keys(antiNodesResonance).length);
}
day8();
