const fs = require('fs');
const content = fs.readFileSync('package-lock.json', 'utf8');
const lines = content.split('\n');

for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i].trim() && lines[i].trim() === lines[i+1].trim()) {
        console.log(`Duplicate adjacent line at ${i+1}: ${lines[i].trim()}`);
    }
}
