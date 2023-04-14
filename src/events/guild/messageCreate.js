const Economy = require("../../models/economySchema");
const mongoose = require("mongoose");
const Levels = require("discord-xp");
const { Message, Client } = require("discord.js");

module.exports = {
  name: "messageCreate",
  /**
   *
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {
    if (message.author.bot) return;

    let economyProfile = await Economy.findOne({
      userId: message.author.id,
      guildId: message.guild.id,
    });

    if (!economyProfile) {
      economyProfile = await Economy.create({
        _id: mongoose.Types.ObjectId(),
        userId: message.author.id,
        guildId: message.guild.id,
      });
    }
  },
};
