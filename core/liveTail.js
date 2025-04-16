const fs = require('fs');
const readline = require('readline');
const emitter = require('../events/emitter');
const analyzeLogLine = require('../core/patternMatcher');
const spikeDetect = require('../alerts/spikeDetector')


let lastByte = 0;

function startLiveMonitoring(filePath) {
    console.info(filePath)
    fs.watch(filePath, () => {
        const { size } = fs.statSync(filePath); // get new size
        if (size > lastByte) {
            const stream = fs.createReadStream(filePath, { start: lastByte });

            const rl = readline.createInterface({
                input: stream,
                crlfDelay: Infinity
            });

            rl.on('line', (line) => {
                if (line.startsWith('[ERROR]')) {
                    spikeDetect();
                    emitter.emit('errorLog', line);
                } else if (line.startsWith('[WARN]')) {
                    emitter.emit('warnLog', line);
                } else if (line.startsWith('[INFO]')) {
                    emitter.emit('infoLog', line);
                }
                const match = analyzeLogLine(line);
                if (match) {
                    emitter.emit("suspicious_match", match)
                }
            });



            rl.on('close', () => {
                console.log("📡 New log lines processed.");
            });

            lastByte = size;
        }
    });
}

module.exports = startLiveMonitoring
