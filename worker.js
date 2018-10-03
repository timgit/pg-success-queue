const Promise = require('bluebird');
const PgBoss = require('pg-boss');
const argv = require('yargs').argv;

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
    
    console.log(`${(new Date()).toLocaleTimeString()}: worker punched in`);
}

    
async function subscribe(){
    return boss.subscribe(queue, {teamSize: count, teamConcurrency: 100}, handler);
}

async function handler(job){
    console.log(`${(new Date()).toLocaleTimeString()}: Received job ${queue}:${job.id}`);

    await Promise.delay(delay);

    console.log(`${(new Date()).toLocaleTimeString()}: Completed job ${queue}:${job.id}`);
}