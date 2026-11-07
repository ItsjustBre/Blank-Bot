const logger = require('@turkerssh/logger');
const { readdirSync } = require('fs');
const path = require('path');
const config = require('../../config');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

function findCommandFiles(directory) {
  const files = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...findCommandFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      files.push(fullPath);
    }
  }

  return files;
}

module.exports = (client) => {
  const commands = [];
  const commandFiles = findCommandFiles(
    path.join(__dirname, '../commands')
  );

  for (const file of commandFiles) {
    const command = require(file);

    if (!command.data || typeof command.execute !== 'function') {
      logger.error({
        type: 'commands',
        message: `Invalid command file: ${file}`
      });
      continue;
    }

    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
  }

  const rest = new REST({ version: '9' }).setToken(
    config.GeneralInformation.BotToken
  );

  (async () => {
    try {
      await rest.put(
        Routes.applicationCommands(config.GeneralInformation.BotId),
        { body: commands }
      );

      logger.success({
        type: 'commands',
        message: `Successfully registered ${commands.length} application commands`
      });
    } catch (error) {
      logger.error({
        type: 'commands',
        message: `Error while registering application commands: ${error.message}`
      });
      console.error(error);
    }
  })();
};
