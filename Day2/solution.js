const input = `.. .. .. .. ..`

function day2() {

    const reports = input.split('\n').map(str => str.split(' ').map(Number));

    const save = reports.filter(isSave);
    const saved = reports.filter(faultSave);

    console.log('[D2P1] save', save.length)
    console.log('[D2P2] faultSave', saved.length);
}

function faultSave(numbers) {

    if (isSave(numbers)) return true;

    for (let i = 0; i < numbers.length; i++) {

        const subSet = numbers.toSpliced(i, 1);
        if (isSave(subSet)) return true;
    }
    return false;
}

function isSave(numbers) {

    let increasing = undefined;

    for (i = 0; i < numbers.length; i++) {

        const current = numbers[i], next = numbers[i + 1];

        if (next) {
            let diff = current - next;

            if (increasing === undefined) {
                increasing = diff > 0 ? true : diff < 0 ? false : undefined;
                if (increasing === undefined) return false;
            }

            if ((increasing && diff < 0) || (!increasing && diff > 0)) return false;

            diff = Math.abs(diff);
            if (diff < 1 || diff > 3) return false;
        }
    }
    return true;
}
day2();
