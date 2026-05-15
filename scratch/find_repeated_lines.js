const fs = require('fs');
const content = fs.readFileSync('package-lock.json', 'utf8');
const lines = content.split('\n');

const lineMap = {};
for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.length < 10) continue; // Skip short lines
    if (!lineMap[line]) {
        lineMap[line] = [];
    }
    lineMap[line].push(i + 1);
}

for (const line in lineMap) {
    if (lineMap[line].length > 1) {
        // Only show if one of the lines is near 9730
        if (lineMap[line].some(l => Math.abs(l - 9730) < 50)) {
            console.log(`Repeated line "${line}" found on lines: ${lineMap[line].join(', ')}`);
        }
    }
}
