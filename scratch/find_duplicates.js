const fs = require('fs');

const content = fs.readFileSync('package-lock.json', 'utf8');
const lines = content.split('\n');

const keys = [];
const keyRegex = /^\s*"([^"]+)":\s*\{?/;

for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(keyRegex);
    if (match) {
        keys.push({ key: match[1], line: i + 1 });
    }
}

const keyMap = {};
for (const entry of keys) {
    if (!keyMap[entry.key]) {
        keyMap[entry.key] = [];
    }
    keyMap[entry.key].push(entry.line);
}

for (const key in keyMap) {
    if (keyMap[key].length > 1) {
        if (keyMap[key].some(line => Math.abs(line - 9730) < 50)) {
             console.log(`Duplicate key "${key}" found on lines: ${keyMap[key].join(', ')}`);
        }
    }
}
