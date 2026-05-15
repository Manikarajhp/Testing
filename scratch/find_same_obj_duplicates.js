const fs = require('fs');
const content = fs.readFileSync('package-lock.json', 'utf8');
const lines = content.split('\n');

let stack = [];
let currentObj = {};

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('{')) {
        stack.push(currentObj);
        currentObj = {};
    }
    if (line.includes('}')) {
        currentObj = stack.pop() || {};
    }
    
    const match = line.match(/^\s*"([^"]+)":/);
    if (match) {
        const key = match[1];
        if (currentObj[key]) {
            console.log(`Duplicate key "${key}" in same object at line ${i + 1}. Previous seen at line ${currentObj[key]}`);
        }
        currentObj[key] = i + 1;
    }
}
