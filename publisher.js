const Promise = require('bluebird');

// progress bar setup
const cliProgress = require('cli-progress');
const progress = new cliProgress.Bar({}, cliProgress.Presets.shades_classic);

// args!
const argv = require('yargs').argv;
let {queue, count} = argv;

queue = queue || 'some-job';
count = count || 1;

const bossConfig = require('./boss_config.json');
const PgBoss = require('pg-boss');

const boss = new PgBoss(bossConfig);

boss.connect()
    .then(publish)
    .catch(console.error)
    .then(() => process.exit(0));


function publish(){

    const jobs = new Array(count).fill(null);
    
    console.log(`Creating ${count} ${queue} jobs...`);

    progress.start(count, 0);

    return Promise.map(jobs, job => boss.publish(queue).then(() => progress.increment()), {concurrency:100})
        .then(() => progress.stop());

}