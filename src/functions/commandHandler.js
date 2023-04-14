const { REST, Routes } = require("discord.js");
const fs = require("fs");

module.exports = (client) => {
  const { commands } = client;
  const commandArray = [];

  const commandFolder = fs.readdirSync("./src/commands");

  for (const folder of commandFolder) {
    const commandFiles = fs
      .readdirSync(`./src/commands/${folder}`)
      .filter((f) => f.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`../commands/${folder}/${file}`);

      commands.set(command.data.name, command);
      commandArray.push(command.data.toJSON());
    }
  }

  const rest = new REST({ version: "10" }).setToken(process.env.token);

  (async () => {
    try {
      console.log("Started refreshing application (/) commands.");

      await rest.put(Routes.applicationGuildCommands(process.env.client_id, process.env.guild_id), { body: commandArray });

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  })();
};
