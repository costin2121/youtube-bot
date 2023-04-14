const fs = require("fs");

module.exports = (client) => {
  const eventFolder = fs.readdirSync("./src/events");

  for (const folder of eventFolder) {
    const eventFiles = fs
      .readdirSync(`./src/events/${folder}`)
      .filter((f) => f.endsWith(".js"));

    for (const file of eventFiles) {
      const event = require(`../events/${folder}/${file}`);

      if (event.once) client.once(event.name, (...args) => event.execute(...args, client))
      else client.on(event.name, (...args) => event.execute(...args, client))
    }
  }
};
