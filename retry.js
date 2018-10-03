const PgBoss = require('pg-boss');
const argv = require('yargs').argv;
const log = require('./logger');

let {queue, count, delay, backoff} = argv;
queue = queue || 'retry';
let retryLimit = count || 5;
let retryDelay = delay || 5;
let retryBackoff = !!backoff;

const bossConfig = require('./boss_config.json');
const boss = new PgBoss(bossConfig);

let subscribeCount = 0;

return connect();

async function connect() {
    await boss.connect();
    await boss.subscribe(queue, handler);
    
    let options = { retryLimit, retryDelay, retryBackoff };
    let jobId = await boss.publish(queue, null, options);

    log(`published job ${jobId}`);
}

async function handler(job){
    
    log(`Received job in queue ${queue}: ${job.id}`);

    if(++subscribeCount < retryLimit){
        log('*** FAILED ***');
        throw new Error('too soon!');
    }

    log('Success!');
}
