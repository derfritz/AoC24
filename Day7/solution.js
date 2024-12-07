// Source: https://adventofcode.com/2020/day/7
function day7() {
    const fs = require('fs');
    const input = fs.readFileSync('./input.txt', 'utf-8');

    const equations = input
        .split('\n')
        .filter(row => row.length > 0)
        .map(row => row.split(': '))
        .map(([key, values]) => [Number(key), values.split(' ').map(Number)]);

    const calculate = (numbers, operator, current, target, supportOr) => {

        if (target === current && numbers.length === 0) return true;
        if (current > target) return false;
        if (numbers.length === 0) return false;

        switch (operator) {
            case '*':
                current *= numbers[0];
                break;
            case '+':
                current += numbers[0];
                break;
            case '|':
                current = Number(`${current}${numbers[0]}`);
                break;
            default: return false;
        }

        return  calculate(numbers.slice(1), '*', current, target, supportOr) ||
                calculate(numbers.slice(1), '+', current, target, supportOr) ||
                (supportOr && calculate(numbers.slice(1), '|', current, target, supportOr));

    }

    const isPossible = ([result, nums]) => calculate(nums, '+', 0, result, false);
    const isPossibleWithOr = ([result, nums]) => calculate(nums, '+', 0, result, true);

    const sumWithoutOr = equations
        .filter(isPossible)
        .map(equation => equation[0])
        .reduce((sum, curr) => sum += curr, 0);

    const sumWithOr = equations
        .filter(isPossibleWithOr)
        .map(equation => equation[0])
        .reduce((sum, curr) => sum += curr, 0);

    console.log('[P7D1]', sumWithoutOr);
    console.log('[P7D2]', sumWithOr);
}

day7();
