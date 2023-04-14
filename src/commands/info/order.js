const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("order")
        .setDescription("Comanda ceva.")
        .addStringOption(option => 
            option
                .setName("comanda")
                .setDescription("Ce vrei sa comanzi")
                .setRequired(true)
                .addChoices({ name: "pizza mica", value: "pizza mica"}, { name: "pizza medie", value: "pizza medie"}, { name: "pizza mare", value: "pizza mare"})
        )
        .addIntegerOption(option => 
            option 
                .setName("cantitate")
                .setDescription("Cantitatea comenzii")
                .setRequired(false)
        ),
        
    async execute(interaction, client)  {
        const order = interaction.options.get("comanda").value;
        const number = interaction.options.get("cantitate");

        const embed = new EmbedBuilder()
            .setTitle("Comanda ta")
            .setDescription(`Comanda ta de ${number ? number.value : "1"} ${order} urmeaza sa fie gata.`)
        
        interaction.reply({ embeds: [embed] })
    }
}