// source: https://adventofcode.com/2020/day/11
function day11() {

    const input = '77 515 6779622 6 91370 959685 0 9861';

    const cache = new Map();
    const numbers = input.split(' ').map(Number);

    const blink = (number, blinks) => {

        const cacheKey = `${number}-${blinks}`;
        if (cache.has(cacheKey)) return cache.get(cacheKey);

        let result;
        if (blinks === 0) result = 1;
        else if (number === 0) result = blink(1, blinks - 1);
        else if (('' + number).length % 2 === 0) {
            const str = '' + number;
            const firstHalf = +str.substring(0, str.length / 2);
            const secondHalf = +str.substring(str.length / 2);
            result = blink(firstHalf, blinks - 1) + blink(secondHalf, blinks - 1);
        } else {
            result = blink(number * 2024, blinks - 1);
        }

        cache.set(cacheKey, result);
        return result;
    }

    console.log('D11P1', numbers.reduce((numberCount,number) => numberCount + blink(number, 25), 0));
    console.log('D11P2', numbers.reduce((numberCount,number) => numberCount + blink(number, 75), 0));
}
day11();