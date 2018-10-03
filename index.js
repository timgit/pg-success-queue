const PgBoss = require('pg-boss');
const bossConfig = require('./boss_config.json');

return index();

async function index() {

    let config = Object.assign({}, bossConfig, {monitorStateIntervalSeconds:2});

    const boss = new PgBoss(config);
    
    console.reset = () => process.stdout.write('\033c');
    
    boss.on('error', console.error);
    
    await boss.start();
    
    console.log(`boss is ready for business in ${bossConfig.database}`);

    boss.on('monitor-states', states => {            
        console.log(`${(new Date()).toLocaleTimeString()}: Queue counts: Created: ${states.created.toLocaleString()}, Active: ${states.active.toLocaleString()}, Completed: ${states.completed.toLocaleString()}`);
    });

}
