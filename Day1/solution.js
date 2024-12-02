const input = `... ...`;

function day1() {

    const left = [], right = [];
    const rightCount = {};

    input.split('\n')
        .map(line => line.split('   '))
        .forEach(line =>{
            left.push(+line[0]);
            right.push(+line[1]);
            rightCount[line[1]] = (rightCount[line[1]] ?? 0) + 1;
        });

    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);

    let diff = 0;
    let similarityScore = 0;

    for (let i = 0; i < left.length; i++) {
        const similarityScoreLine = rightCount[left[i]] ?? 0;
        const diffLine = Math.abs(left[i] - right[i]);

        diff += diffLine;
        similarityScore += left[i] * similarityScoreLine;
    }

    console.log('[D1P1] diff', diff);
    console.log('[D1P2] similarityScore', similarityScore);
}
day1();

