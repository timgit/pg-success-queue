const Promise = require('bluebird');
const PgBoss = require('pg-boss');
const argv = require('yargs').argv;

let {queue, count, delay} = argv;
queue = queue || 'some-job';
count = count || 1;
delay = delay || 100;

const bossConfig = require('./boss_config.json');
const boss = new PgBoss(bossConfig);

boss.connect()
    .then(subscribe)
    .then(() => console.log(`worker punched in @ ${Date.now()}`))
    .catch(console.error);

    
function subscribe(){
    return boss.subscribe(queue, {teamSize: count}, handler);
}

function handler(job){
    console.log(`Received job ${queue}:${job.id} at ${Date.now()}`);

    Promise.delay(delay)
        .then(() => job.done())
        .then(() => console.log(`Completed job ${queue}:${job.id} at ${Date.now()}`))
        .catch(console.error);
}