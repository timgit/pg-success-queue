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
    .then(() => console.log(`${(new Date()).toLocaleTimeString()}: worker punched in`))
    .catch(console.error);

    
function subscribe(){
    return boss.subscribe(queue, {teamSize: count}, handler);
}

function handler(job){
    console.log(`${(new Date()).toLocaleTimeString()}: Received job ${queue}:${job.id}`);

    Promise.delay(delay)
        .then(() => job.done())
        .then(() => console.log(`${(new Date()).toLocaleTimeString()}: Completed job ${queue}:${job.id}`))
        .catch(console.error);
}