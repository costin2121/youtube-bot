const Account = require("../../models/accountSchema");
const mongoose = require("mongoose");
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

    let accountProfile = await Account.findOne({
      user: message.author.id,
      guild: message.guild.id,
    });

    if (!accountProfile) {
      accountProfile = await Account.create({
        _id: mongoose.Types.ObjectId(),
        user: message.author.id,
        guild: message.guild.id,
      });
    }
  },
};
