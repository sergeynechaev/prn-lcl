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

const getLocalTrackableBranches = async () => {
  const res = await runCmd(['branch', '-vv']);
  if (!res) return [];
  return res
    .split('\n')
    .filter(l => /origin\//.test(l))
    .map(
      l =>
        l
          .replace('*', '')
          .trim()
          .split(' ')[0],
    );
};

const getRemoteBranches = async () => {
  const res = await runCmd(['branch', '-r']);
  if (!res) return [];
  return res
    .split('\n')
    .filter(l => l)
    .map(l => l.replace('origin/', '').trim());
};

const remotePruneOrigin = async () => {
  return await runCmd(['remote', 'prune', 'origin']);
};

const fetchPrune = async () => {
  return await runCmd(['fetch', '--prune']);
};

const deleteBranches = async branches => {
  if (!branches) return Promise.resolve();
  if (!Array.isArray(branches)) branches = [branches];
  return await runCmd(['branch', '-d', ...branches]);
};

module.exports = {
  runCmd,
  getLocalTrackableBranches,
  getRemoteBranches,
  remotePruneOrigin,
  fetchPrune,
  deleteBranches,
};
