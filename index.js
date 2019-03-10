const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const clui = require('clui');

const git = require('./src/git');
const ask = require('./src/ask');

const run = async () => {
  clear();

  console.log(
    chalk.green(figlet.textSync('prn-lcl', { horizontalLayout: 'fitted' })),
  );
  console.log('');

  const spinner = new clui.Spinner('Pruning remote branches...');

  spinner.start();
  await git.remotePruneOrigin();
  spinner.stop();

  spinner.message('Compare local and remotes branches...');
  spinner.start();

  await git.fetchPrune();
  const localTrackable = await git.getLocalTrackableBranches();
  const remoteBr = await git.getRemoteBranches();

  spinner.message('');
  spinner.stop();

  const toDelete = localTrackable.filter(b => remoteBr.indexOf(b) === -1);

  if (!toDelete.length) {
    console.log(chalk.green('There in nothing to delete, exiting.'));
    return 0;
  }

  const selected = await ask.brachesToDelete(toDelete);
  if (!selected.toDelete.length) {
    console.log(chalk.green('Nothing was selected, exiting.'));
    return 0;
  }

  const confirm = await ask.confirmDelete(selected.toDelete);
  if (!confirm.delete) {
    console.log(chalk.green("It's up to you, exiting."));
    return 0;
  }

  console.log('Selected to delete:', selected.toDelete);
};

run().catch(err => console.error('An error occured:', err));
