const Promise = require('bluebird');
const PgBoss = require('pg-boss');
const argv = require('yargs').argv;
const log = require('./logger');

let {queue, count, interval} = argv;
queue = queue || 'throttle';
count = count || 1;
interval = interval || 10;

const bossConfig = require('./boss_config.json');
const boss = new PgBoss(bossConfig);

return connect();

async function connect() {
    await boss.connect();
    
    for(;;){
        await publish();
        await Promise.delay(1000);
    }
}

async function publish() {
    let jobId = await boss.publishThrottled(queue, null, null, interval);
    log(`${jobId ? 'published job: ' + jobId : '** THROTTLED **'}`);
}