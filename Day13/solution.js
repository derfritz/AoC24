// Source: https://adventofcode.com/2024/day/13
function day13() {

    const input = require('fs').readFileSync('./input.txt', 'utf-8');

    const regex = /Button ([AB]): X\+(\d+), Y\+(\d+)|Prize: X=(\d+), Y=(\d+)/g;
    const gachas = [];

    let match;
    let gacha = {};

    while ((match = regex.exec(input)) !== null) {
        switch (match[1]) {
            case 'A':
                gacha = {...gacha, a: {x: parseInt(match[2]), y: parseInt(match[3])}};
                break;
            case 'B':
                gacha = {...gacha, b: {x: parseInt(match[2]), y: parseInt(match[3])}};
                break;
            default:
                gachas.push({...gacha, price: {x: parseInt(match[4]), y: parseInt(match[5])}});
                gacha = {};
        }
    }

    const playStupid = (gacha) => {

        const priceX = gacha.price.x;
        const priceY = gacha.price.y;

        const rounds = 100;

        for (let i = rounds; i > 0; i--) {
            for (let j = 0; j < rounds; j++) {

                const pressA = j;
                const pressB = i;

                const x = (pressA * gacha.a.x) + (pressB * gacha.b.x);
                const y = (pressA * gacha.a.y) + (pressB * gacha.b.y);

                if (x === priceX && y === priceY) {
                    return (pressA * 3) + pressB;
                }
            }
        }
        return 0;
    }
    const playSmart = (gacha, priceCorrection = 0) => {
        // let's solve this using Cramer's rule (thanks wikipedia)
        const priceX = gacha.price.x + priceCorrection;
        const priceY = gacha.price.y + priceCorrection;

        const ax = gacha.a.x;
        const bx = gacha.b.x;
        const ay = gacha.a.y;
        const by = gacha.b.y;

        const det = ax * by - bx * ay;

        if (det === 0) return 0; // No solution or infinite solutions

        const pressA = (priceX * by - priceY * bx) / det;
        const pressB = (priceY * ax - priceX * ay) / det;

        if (pressA >= 0 && pressB >= 0 && Number.isInteger(pressA) && Number.isInteger(pressB))
            return (pressA * 3) + pressB;

        return 0;
    }

    const tokensSpent = gachas.reduce((acc, gacha) =>  acc + playStupid(gacha),0);
    console.log('D13P1:', tokensSpent);

    const tokensSpentAfterCorrection = gachas.reduce((acc, gacha) =>  acc + playSmart(gacha, 10000000000000),0);
    console.log('D13P2:', tokensSpentAfterCorrection);
}
day13();
