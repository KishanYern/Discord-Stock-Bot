const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Returns an embed'),

    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle(`Stocks Bot Project`)
            .setDescription('This will have various real-time stock commands')
            .setColor(0x18e1ee)
            .setImage(client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: client.user.tag,
            })
            .setURL('https://youtube.com')
            .addFields([
                {
                    name: 'Field 1',
                    value: 'Field value 1',
                    inline: true,
                },
                {
                    name: 'Field 2',
                    value: 'Field value 2',
                    inline: true,
                },
            ]);

        await interaction.reply({
            embeds: [embed],
        });
    },
};
