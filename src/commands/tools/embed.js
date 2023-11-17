const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Returns information about the project.'),

    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle(`Stocks Bot Project`)
            .setDescription(
                'This will have various real-time stock commands. This was made as one of the first projects to practice javascript, specifically discordjs.'
            )
            .setColor(0x18e1ee)
            .setImage(client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: client.user.tag,
            })
            .setURL('https://github.com/KishanYern/Discord-Stock-Bot.git')
            .addFields([
                {
                    name: "Kishan's Github",
                    value: 'https://github.com/KishanYern',
                    inline: true,
                },
                {
                    name: "Khoa's Github",
                    value: 'https://github.com/AnhKhoaNG',
                    inline: true,
                },
            ]);

        await interaction.reply({
            embeds: [embed],
        });
    },
};
