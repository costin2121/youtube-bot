const { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction, Client, } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pong!"),
        /**
         * 
         * @param {ChatInputCommandInteraction} interaction 
         * @param {Client} client 
         */
    async execute(interaction, client)  {
        interaction.reply({ content: "Pong!" })
    }
}