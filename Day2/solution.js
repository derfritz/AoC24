// Source: https://adventofcode.com/2024/day/2
function day2() {

    const input = require('fs').readFileSync('./input.txt', 'utf8');
    const reports = input.split('\n').map(str => str.split(' ').map(Number));

    const isSave = (numbers) => {

        if (isSave(numbers)) return true;

        for (let i = 0; i < numbers.length; i++) {

            const subSet = numbers.toSpliced(i, 1);
            if (isSave(subSet)) return true;
        }
        return false;
    };
    const isFaultSave = (numbers) => {

        let increasing = undefined;

        for (let i = 0; i < numbers.length - 1; i++) {

            let diff = numbers[i] - numbers[i + 1];

            if (increasing === undefined) increasing = diff > 0;
            if ((increasing && diff <= 0) || (!increasing && diff >= 0) || Math.abs(diff) > 3) return false;
        }
        return true;
    }

    const save = reports.filter(isSave);
    const saved = reports.filter(isFaultSave);

    console.log('[D2P1] save', save.length)
    console.log('[D2P2] faultSave', saved.length);
}
day2();
