require('./build/plugins/env');
const path = require('path');
const { runner } = require('node-pg-migrate');

const migrationDir = path.join(__dirname, '/migrations');

const { DB_CONNECTION } = require('./build/constants/env');

const runMigrations = async () => {
  const options = {
    databaseUrl: DB_CONNECTION,
    dir: migrationDir,
    direction: 'up',
    count: Infinity,
  };

  try {
    console.log('Run migrations');
    await runner(options);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

runMigrations();
