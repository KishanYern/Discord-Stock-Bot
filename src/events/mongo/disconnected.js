const chalk = require('chalk');

module.exports = {
    name: 'disconnecting',
    execute(client) {
        console.log(chalk.red('[Database Status]: Disconnected.'));
    },
};
