const fs = require('fs');
const content = fs.readFileSync('package-lock.json', 'utf8');
const lines = content.split('\n');

const newLines = [];
let i = 0;
while (i < lines.length) {
    let j = i + 1;
    let foundDuplicate = false;
    
    // This is a bit complex for a script, but I'll try to find if the next block is the same
    if (lines[i].includes('": {')) {
        // Find end of current block
        let depth = 1;
        let k = i + 1;
        while (k < lines.length && depth > 0) {
            if (lines[k].includes('{')) depth++;
            if (lines[k].includes('}')) depth--;
            k++;
        }
        
        const blockSize = k - i;
        const currentBlock = lines.slice(i, k).join('\n');
        const nextBlock = lines.slice(k, k + blockSize).join('\n');
        
        if (currentBlock === nextBlock) {
            console.log(`Found duplicate block starting at line ${i + 1} and ${k + 1}`);
            newLines.push(...lines.slice(i, k));
            i = k + blockSize; // Skip both the current and the duplicate? No, just skip the duplicate.
            // Wait, if I skip the duplicate, I should skip blockSize lines starting from k.
            foundDuplicate = true;
        }
    }
    
    if (!foundDuplicate) {
        newLines.push(lines[i]);
        i++;
    }
}

fs.writeFileSync('package-lock.json', newLines.join('\n'));
console.log('Finished removing adjacent duplicate blocks.');
