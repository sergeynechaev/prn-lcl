const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const clui = require('clui');

const git = require('./src/git');

const run = async () => {
  clear();

  console.log(
    chalk.green(figlet.textSync('prn-lcl', { horizontalLayout: 'full' })),
  );
  console.log('You are about to prune these local branches');

  const spinner = new clui.Spinner('Pruning remote branches...');
  spinner.start();

  await git.remotePruneOrigin();
  await git.fetchPrune();

  spinner.message('');
  spinner.stop();

  const localBr = await git.getLocalBranches();
  console.log('localBr', localBr);

  const remoteBr = await git.getRemoteBranches();
  console.log('remoteBr', remoteBr);

  const localTrackable = await git.getLocalTrackableBranches();
  console.log('localTrackable', localTrackable);
};

run().catch(err => console.error('An error occured:', err));
