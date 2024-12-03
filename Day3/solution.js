function day3() {

    const fs = require('fs');
    const input = fs.readFileSync('./input.txt', 'utf8');

    const part1Result = part1(input);
    const part2Result = part2(input);

    console.log('[D3P1]', part1Result);
    console.log('[D3P2]', part2Result);

}
function part1(input) {
    const regex = /mul\((\d+),(\d+)\)/g;

    let match;
    let result = 0;

    while ((match = regex.exec(input)) !== null) {
        result += parseInt(match[1]) * parseInt(match[2]);
    }
    return result;
}
function part2(input) {

    const regex = /mul\((\d+),(\d+)\)|don't\(\)|do\(\)/g;

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

day3();
