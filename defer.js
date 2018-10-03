const Promise = require('bluebird');
const PgBoss = require('pg-boss');
const argv = require('yargs').argv;
const log = require('./logger');

let {queue, count, delay} = argv;
queue = queue || 'defer';
count = count || 1;
delay = delay || 10;

const bossConfig = require('./boss_config.json');
const boss = new PgBoss(bossConfig);

return connect();

async function connect() {
    await boss.connect();
    await boss.subscribe(queue, handler);
    
    let jobId = await boss.publishAfter(queue, null, null, delay);

    log(`published job for retrieval in ${delay} seconds: ${jobId}`);
}

async function handler(job){
    log(`Received job in queue ${queue}: ${job.id}`);
}
