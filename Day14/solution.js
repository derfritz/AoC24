// source: https://adventofcode.com/2024/day/14
function day14() {

    const input = require('fs').readFileSync('./input.txt', 'utf-8');

    const regex = /p=([+-]?\d+),([+-]?\d+) v=([+-]?\d+),([+-]?\d+)/;

    const length = 103;
    const width = 101;
    const seconds = 100;

    const matrix = Array.from({length}, () => Array.from({length: width}, () => 0));
    const robots = input
        .split('\n')
        .filter(row => row.length > 0)
        .map(row => regex.exec(row))
        .map((match) => ({
                x: Number(match[1]),
                y: Number(match[2]),
                vx: Number(match[3]),
                vy: Number(match[4])
            })
        );

    // place the robots
    robots.forEach(robot => {
        matrix[robot.y][robot.x]++;
    });

    const log = () => {
        matrix.forEach(row => console.log(row.join('').replaceAll('0', '.')));
        console.log('\n');
    }
    const tick = (second) => {
        robots.forEach(robot => move(robot, matrix));
        return findUnusualPattern(second, matrix);
    }
    const findUnusualPattern = (tick) => {

        const pattern = [];
        const windowSize = 3;

        // too lazy for edge detection, find fully filled windows
        for (let y = 0; y <= length - windowSize; y++) {
            for (let x = 0; x <= width - windowSize; x++) {
                let sum = 0;
                for (let wy = 0; wy < windowSize; wy++) {
                    for (let wx = 0; wx < windowSize; wx++) {
                        sum += matrix[y + wy][x + wx];
                    }
                }
                if (sum >= windowSize * windowSize) {
                    pattern.push({ x, y, sum });
                }
            }
        }
        if (pattern.length > 10) {
            console.log(`Unusual Pattern at tick ${tick}:`, pattern.length);
            return tick;
        }
        return -1;
    }
    const move = (robot) => {

        const {x, y, vx, vy} = robot;
        matrix[y][x]--;

        let toX = x + vx;
        let toY = y + vy;

        toX = toX < 0 ? toX + width : toX > width -1 ? toX - width: toX;
        toY = toY < 0 ? toY + length : toY > length -1 ? toY - length: toY;

        matrix[toY][toX]++;

        robot.x = toX;
        robot.y = toY;
    }

    const calculateSafetyFactor = (sec) => {

        for(let i = 1; i <= sec; i++) tick(i, matrix);

        let safetyFactor = 1;
        [
            matrix.filter((row, index) => index < (length -1) / 2).map(row => row.filter((_, index) => index < (width -1) / 2)),
            matrix.filter((row, index) => index < (length -1) / 2).map(row => row.filter((_, index) => index > (width -1) / 2)),
            matrix.filter((row, index) => index > (length -1) / 2).map(row => row.filter((_, index) => index < (width -1) / 2)),
            matrix.filter((row, index) => index > (length -1) / 2).map(row => row.filter((_, index) => index > (width -1) / 2)),
        ].map(quadrant => quadrant.reduce((acc, row) => acc + row.reduce((acc, cell) => acc + cell, 0), 0))
            .forEach((factor) => safetyFactor *= factor);

        return safetyFactor;
    }
    const findEasterEggFrame = (start) => {

        let frame = start; // already at 100
        let found = -1;

        while (found = tick(frame) === -1) {
            frame++;
            if (frame > 10_000) return -1;
        }

        log(matrix);
        return frame;
    }

    console.log('D14P1', calculateSafetyFactor(seconds));
    console.log('D14P2', findEasterEggFrame(seconds));
}

day14();