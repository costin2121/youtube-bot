const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ask")
    .setDescription("Intreaba un AI ceva!")
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("Ce vrei sa intrebi")
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

    const completion = await openai.createChatCompletion({
      messages: [
        {
          content: prompt,
          role: "user",
        },
      ],
      temperature: 0.2,
      model: "gpt-3.5-turbo",
    });

    const embed = new EmbedBuilder()
      .setDescription(completion.data.choices[0].message.content)
      .setColor("Gold")
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  },
};
