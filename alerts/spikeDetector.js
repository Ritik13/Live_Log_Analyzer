const emitter = require('../events/emitter')

let errorTimeStamp = [];
function spikeDetect() {
    const currentTime = Date.now();
    errorTimeStamp.push(currentTime);
    const oneMinuteAgo = currentTime - 60_000;
    errorTimeStamp = errorTimeStamp.filter(ts => ts >= oneMinuteAgo);
    if (errorTimeStamp.length >= 10) {
        emitter.emit('errorSpike', {
            count: errorTimeStamp.length,
            within: "60s"
        });
    }
}

module.exports = spikeDetect
