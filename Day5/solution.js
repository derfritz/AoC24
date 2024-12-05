function day5() {

    const fs = require('fs');
    const input = fs.readFileSync('./input.txt', 'utf8');
    const rows = input.split('\n');
    const controlMap = new Map();

    const instructions = rows
        .filter(row => row.includes(','))
        .map(row => row.split(',').map(Number));

    let validCount = 0, repairCount = 0;

    const validInstructions = (instructions) => {

        let valid = true;
        for (let i = 0; i < instructions.length; i++) {

            const current = instructions[i];
            const control = controlMap.get(current) || [];
            const before = instructions.slice(0, i);

            const invalid = control.some(num => before.includes(num));
            if (invalid) {
                valid = false;
            }
        }
        return valid;
    }

    const repairInstructions = (instructions) => {

        let repaired = [...instructions];

        while (!validInstructions(repaired)) {

            for (let i = 0; i < repaired.length; i++) {

                const current = repaired[i];
                const control = controlMap.get(current) || [];
                const before = repaired.slice(0, i);

                if (control.some(num => before.includes(num))) {
                    for (let j = before.length - 1; j >= 0; j--) {
                        const num = repaired[j];
                        if (control.includes(num)) {
                            repaired[j] = current;
                            repaired[i] = num;
                            i = j;
                        }
                    }
                }
            }
        }
        return repaired;
    }

    rows.filter(row => row.includes('|'))
        .map(row => row.split('|'))
        .map(([key, value]) => [Number(key), Number(value)])
        .forEach(([key, value]) => controlMap.set(key, controlMap.has(key) ? [...controlMap.get(key), value].sort() : [value]));

    instructions
        .filter(validInstructions)
        .reduce((acc, val) => validCount += val[Math.floor(val.length / 2)], validCount);

    instructions
        .filter(i => !validInstructions(i))
        .map(repairInstructions)
        .reduce((acc, val) => repairCount += val[Math.floor(val.length / 2)], repairCount);

    console.log('[D5P1]', validCount);
    console.log('[D5P2]', repairCount);
}
day5();
