const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Trimite un embed!"),
    async execute(interaction, client)  {

        const embed = new EmbedBuilder()
            .setTitle("Acesta este un titlu")
            .setColor("Gold")
            .setDescription(`Aceasta este o descriere`)
            .setThumbnail("https://png.pngitem.com/pimgs/s/108-1084991_discord-logo-transparent-background-discord-logo-png-png.png")
            .setImage("https://png.pngitem.com/pimgs/s/108-1084991_discord-logo-transparent-background-discord-logo-png-png.png")
            .setAuthor({
                name: "Acesta este un  text",
                url: "https://google.com",
                iconURL: "https://png.pngitem.com/pimgs/s/108-1084991_discord-logo-transparent-background-discord-logo-png-png.png"
            })
            .addFields({
                name: "field 1",
                value: "acesta este primul field",
                inline: false
            }, {
                name: "field 2",
                value: "acesta este al 2-lea field",
                inline: true
            }, {
                name: "field 3",
                value: "acesta este al 3-lea field",
                inline: true
            })
            .setFooter({
                text: "acesta este un footer",
                iconURL: interaction.member.user.avatarURL()
            })
            .setURL("https://google.com")
            .setTimestamp();
            
        interaction.reply({ embeds: [embed] })
    }
}