const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("generate-images")
    .setDescription("Generaza o imagine baza pe un text!")
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("Ce vrei sa generezi")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    let prompt = interaction.options.getString("prompt", true);

    const config = new Configuration({
      apiKey: process.env.openai_key,
    });

    const openai = new OpenAIApi(config);

    await interaction.deferReply();

    const image = await openai.createImage({
      prompt: prompt,
      size: "512x512",
    });

    const embed = new EmbedBuilder()
      .setDescription(`Am generat aceasta imagine baza pe textul: \`${prompt}\``)
      .setImage(image.data.data[0].url)
      .setColor("Gold")
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  },
};
