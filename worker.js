const Promise = require('bluebird');
const PgBoss = require('pg-boss');
const argv = require('yargs').argv;
const log = require('./logger');

let {queue, count, delay} = argv;
queue = queue || 'some-job';
count = count || 1;
delay = delay || 100;

const bossConfig = require('./boss_config.json');
const boss = new PgBoss(bossConfig);

return connect();

async function connect() {
    await boss.connect();
    await subscribe();
    
    log(`worker punched in for queue ${queue}`);
}
    
async function subscribe(){
    return boss.subscribe(queue, {teamSize: count, teamConcurrency: 100}, handler);
}

async function handler(job){
    log(`Received job ${job.name}: ${job.id}`);
    await Promise.delay(delay);
}
