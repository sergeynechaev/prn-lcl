const { spawn } = require('child_process');

const runCmd = args => {
  return new Promise((resolve, reject) => {
    if (!args.length) {
      reject('No arguments were given');
    }

    const commandExecuter = spawn('git', args);
    let stdOutData = '';
    let stderrData = '';

    commandExecuter.stdout.on('data', data => (stdOutData += data));
    commandExecuter.stderr.on('data', data => (stderrData += data));
    commandExecuter.on('close', code =>
      code != 0
        ? reject(stderrData.toString())
        : resolve(stdOutData.toString()),
    );
  });
};

const listLocalBranches = async () => {
  console.log('listLocalBranches');
  return await runCmd(['branch']);
};

module.exports = {
  runCmd,
  listLocalBranches,
};
