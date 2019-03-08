const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const { listLocalBranches } = require('./src/git');

const run = async () => {
  clear();

  console.log(
    chalk.green(figlet.textSync('prn-lcl', { horizontalLayout: 'full' })),
  );
  console.log('You are about to prune these local branches');
  const res = await listLocalBranches();
  console.log('res', res);
};

run();
