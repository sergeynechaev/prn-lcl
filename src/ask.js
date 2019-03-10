const inquirer = require('inquirer');

const brachesToDelete = branchList => {
  const question = [
    {
      type: 'checkbox',
      name: 'toDelete',
      message: `There are ${
        branchList.length
      } branch(es) with no origin tracking. Select which ones you wish to delete and press Enter:\n`,
      choices: branchList,
    },
  ];
  return inquirer.prompt(question);
};

const confirmDelete = branchList => {
  const question = [
    {
      type: 'confirm',
      name: 'delete',
      message: `Are you sure to permanentely delete ${
        branchList.length
      } branch(es)?`,
      default: false,
    },
  ];
  return inquirer.prompt(question);
};

module.exports = {
  brachesToDelete,
  confirmDelete,
};
