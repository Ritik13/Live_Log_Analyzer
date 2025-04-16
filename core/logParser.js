const fs = require('fs');
const readline = require('readline');
const emitter = require('../events/emitter');

function parseLogFile(filePath) {
    const stream = fs.createReadStream(filePath, { encoding: 'utf-8' });
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
    })

    let line_n = 0;
    rl.on('line', (line) => {
        line_n++;
        if (line.startsWith('[ERROR]') ) {
            emitter.emit('errorLog', line)
        } else if (line.startsWith('[WARN]')) {
            emitter.emit('warnLog', line)
        } else if (line.startsWith('[INFO]')) {
            emitter.emit('infoLog', line)
        }
        console.log(`Line ${line_n}: ${line}`);
    });

    rl.on('close', () => {
        console.log("✅ Finished reading file.");
    });
}

module.exports = parseLogFile
