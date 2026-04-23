const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');

function walk(directory) {
    fs.readdirSync(directory).forEach(file => {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;
            content = content.replace(/#1ed760/gi, '#f83821');
            content = content.replace(/30,215,96/gi, '248,56,33');
            content = content.replace(/30, 215, 96/gi, '248, 56, 33');
            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log('Updated ' + fullPath);
            }
        }
    });
}

walk(dir);
console.log('Done');
