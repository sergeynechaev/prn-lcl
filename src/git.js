const { spawn } = require('child_process');

const runCmd = args => {
  return new Promise((resolve, reject) => {
    if (!args.length) {
      reject('No arguments were given');
    }

    const cmd = spawn('git', args);
    let stdOutData = '';
    let stderrData = '';

    cmd.stdout.on('data', data => (stdOutData += data));
    cmd.stderr.on('data', data => (stderrData += data));
    cmd.on('close', code =>
      code != 0
        ? reject(stderrData.toString())
        : resolve(stdOutData.toString()),
    );
  });
};

const getLocalBranches = async () => {
  return await runCmd(['branch']);
};

const getLocalTrackableBranches = async () => {
  return await runCmd(['branch', '-vv']);
};

const getRemoteBranches = async () => {
  return await runCmd(['branch', '-r']);
};

const remotePruneOrigin = async () => {
  return await runCmd(['remote', 'prune', 'origin']);
};

const fetchPrune = async () => {
  return await runCmd(['fetch', '--prune']);
};

module.exports = {
  runCmd,
  getLocalBranches,
  getLocalTrackableBranches,
  getRemoteBranches,
  remotePruneOrigin,
  fetchPrune,
};
