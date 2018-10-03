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

return connect();

async function connect() {
    await boss.connect();
    await publish();
    process.exit(0);
}

async function publish(){
    const jobs = new Array(count).fill(null);
    
    console.log(`${(new Date()).toLocaleTimeString()}: Creating ${count} ${queue} jobs...\n`);

    progress.start(count, 0);

    await Promise.map(jobs, job => boss.publish(queue).then(() => progress.increment()), {concurrency:100});

    progress.stop();

    console.log(`\n${(new Date()).toLocaleTimeString()}: Finished.`);
}