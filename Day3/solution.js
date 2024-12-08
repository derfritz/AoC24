// Source: https://adventofcode.com/2020/day/3
function day3() {

    const input = require('fs').readFileSync('./input.txt', 'utf8');

    const parse = (input, regex) => {
        let match;
        let result = 0;
        let enabled = true;

        while ((match = regex.exec(input)) !== null) {
            switch (match[0]) {
                case 'do()':
                    enabled = true;
                    break;
                case 'don\'t()':
                    enabled = false;
                    break;
                default:
                    if (enabled) result += parseInt(match[1]) * parseInt(match[2]);
            }
        }
        return result;
    }

    const part1Result = parse(input, /mul\((\d+),(\d+)\)/g);
    const part2Result = parse(input, /mul\((\d+),(\d+)\)|don't\(\)|do\(\)/g);

    console.log('[D3P1]', part1Result);
    console.log('[D3P2]', part2Result);

}

day3();
