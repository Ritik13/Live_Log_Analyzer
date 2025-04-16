const startLiveMonitoring = require('./core/liveTail');
const emitter = require('./events/emitter');
const logAlert = require('./alerts/alertLogger');

// DEMO block
if (process.argv.includes('--demo')) {
  const fs = require('fs');
  const path = './logs/system.log';
  for (let i = 1; i <= 10; i++) {
    fs.appendFileSync(path, `[ERROR] Simulated error #${i}\n`);
  }
}

// Start live monitoring
startLiveMonitoring('./logs/system.log');

// Alert listeners
emitter.on('errorLog', line => console.error('❌', line));
emitter.on('warnLog', line => console.warn('⚠️', line));
emitter.on('infoLog', line => console.log('ℹ️', line));

emitter.on('patternMatch', result => {
  console.log(`🚨 Pattern matched [${result.type}]: ${result.details}`);
  logAlert(result);
});

emitter.on('errorSpike', data => {
  console.log(`🔥 ERROR SPIKE: ${data.count} errors in ${data.within}`);
  logAlert({ type: 'error_spike', details: `Spike of ${data.count} errors in ${data.within}` });
});
