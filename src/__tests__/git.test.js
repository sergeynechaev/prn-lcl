const { listLocalBranches } = require('../git');

test('Attempt 2', async () => {
  const spy = jest.spyOn(console, 'log');
  const result = await listLocalBranches();

  expect(result).toEqual(['1']);
  expect(spy.mock.calls).toEqual([['listLocalBranches']]);
});
