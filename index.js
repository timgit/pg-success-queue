const PgBoss = require('pg-boss');
const bossConfig = require('./boss_config.json');
const log = require('./logger');

return index();

async function index() {

    let config = Object.assign({}, bossConfig, {monitorStateIntervalSeconds:2});

    const boss = new PgBoss(config);
    
    console.reset = () => process.stdout.write('\033c');
    
    boss.on('error', console.error);
    
    await boss.start();
    
    log(`boss is ready for business in ${bossConfig.database}`);

    boss.on('monitor-states', states => {            
        log(`Queue counts: Created: ${states.created.toLocaleString()}, Active: ${states.active.toLocaleString()}, Completed: ${states.completed.toLocaleString()}`);
    });

}
