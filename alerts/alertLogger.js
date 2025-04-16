const fs = require('fs');
const path = require('path')
const logFilePath = path.join(__dirname, 'security.log');
function logAlert(alert) {
    // we have this return from our alert
    // return { matched: boolean, type: "__message__", details: line };
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] [${alert.type.toUpperCase()}] ${alert.details}\n`;

    fs.appendFile(logFilePath , logLine , (err) => {
        if(err) {
            console.error('x Failed to write alert:', err.message);
        }
    })
}

module.exports = logAlert;
