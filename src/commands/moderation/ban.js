const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  Client,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Baneaza un membru!")
    .addUserOption((option) =>
      option
        .setName("membru")
        .setDescription("Membrul caruia vrei sa ii dai ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("motiv")
        .setDescription("Motivul pentru care il banezi pe acest membru")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const member = interaction.options.getMember("membru");
    const reason =
      interaction.options.getString("motiv", false) || "Fara motiv.";

    const embed = new EmbedBuilder().setColor("Gold").setTimestamp();

    if (!member) {
      embed.setDescription(`Acel membru este deja banat.`).setColor("Red");
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (!member.bannable) {
      embed.setDescription(`${member} nu poate fi banat.`).setColor("Red");
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    try {
      member
        .ban({
          reason,
        })
        .then(() => {
          embed.setDescription(
            `${member} a fost banat cu sucess!\n**Motiv**: \`${reason}\``
          );

          interaction.reply({
            embeds: [embed],
          });

          embed.setDescription(
            `Ai fost banat pe serverul \`${interaction.guild.name}\` de catre ${interaction.member}\n**Motiv**: \`${reason}\``
          );

          member.send({
            embeds: [embed],
          });
        });
    } catch (e) {
      console.error(e);
    }
  },
};
