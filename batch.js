const PgBoss = require('pg-boss');
const argv = require('yargs').argv;
const log = require('./logger');

let {queue, count, delay} = argv;
queue = queue || 'batch';
count = count || 1;

const bossConfig = require('./boss_config.json');
const boss = new PgBoss(bossConfig);
let subscribeCount = 0;

return connect();

async function connect() {
    await boss.connect();
    await boss.subscribe(queue, {batchSize: count}, handler);
}

async function handler(jobs){
    log(`Received ${jobs.length} jobs in queue ${queue} on interval ${++subscribeCount}`);
}
