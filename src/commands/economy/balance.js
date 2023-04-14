const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");
const Economy = require("../../models/economySchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Vezi cati bani are un membru in contul lui.")
    .addUserOption((option) =>
      option
        .setName("membru")
        .setDescription("Membrul caruia vrei sa ii vezi contul.")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    const embed = new EmbedBuilder().setColor("Gold");

    const user =
      interaction.options.getUser("membru", false) || interaction.member;

    const profile = await Economy.findOne({
      user: user.id,
      guild: interaction.guild.id,
    });

    if (!profile) {
      embed
        .setDescription(`Nu am putut accessa contul lui ${user}`)
        .setColor("Red");

      return interaction.reply({ embeds: [embed] });
    }

    embed
      .setTitle(`Contul lui ${user.user ? user.user.tag : user.tag}`)
      .setDescription(`Banuti: ${profile.coins}\nBanca: ${profile.bank}`);
    interaction.reply({ embeds: [embed] });
  },
};
