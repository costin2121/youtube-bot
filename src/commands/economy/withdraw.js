const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");
const Account = require("../../models/accountSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("withdraw")
    .setDescription("Scoate bani din banca!")
    .addIntegerOption((option) =>
      option
        .setName("suma")
        .setDescription("Suma pe care vrei sa o scoti")
        .setMinValue(1)
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const embed = new EmbedBuilder().setColor("Gold");

    const amount = interaction.options.getInteger("suma", true);

    const profile = await Account.findOne({
      user: interaction.member.id,
      guild: interaction.guild.id,
    });

    if (!profile) {
      embed
        .setDescription(`Nu am putut accessa contul tau bancar.`)
        .setColor("Red");

      return interaction.reply({ embeds: [embed] });
    }

    if (profile.bank < amount) {
      embed
        .setDescription(`Nu ai destui banuti pentru a scoate.`)
        .setColor("Red");

      return interaction.reply({ embeds: [embed] });
    }

    try {
      profile.coins += amount;
      profile.bank -= amount;

      await profile.save().then(() => {
        embed.setDescription(`Ai scos: \`${amount}\` banuti`);

        interaction.reply({ embeds: [embed] });
      });
    } catch (e) {
      console.log(e);
    }
  },
};
