const PgBoss = require('pg-boss');
const bossConfig = require('./boss_config.json');

let config = Object.assign({}, bossConfig, {monitorStateIntervalSeconds:2});

const boss = new PgBoss(config);

boss.on('error', console.error);

boss.start()
    .then(() => console.log(`boss is ready for business in ${bossConfig.database}`))
    .then(() => {
        boss.on('monitor-states', states => {
            console.log(`${Date.now()} - Queue counts: Created: ${states.created.toLocaleString()}, Active: ${states.active.toLocaleString()}, Completed: ${states.complete.toLocaleString()}`);
        });
    });