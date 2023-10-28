const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription("returns buttons to dev's githubs"),

    async execute(interaction) {
        const KishGithub = new ButtonBuilder()
            .setCustomId('KishGithub')
            .setLabel('Kishan')
            .setStyle(ButtonStyle.Primary)
            .setURL('https://github.com/KishanYern');

        const KhoaGithub = new ButtonBuilder()
            .setCustomId('KhoaGithub')
            .setLabel('Khoa')
            .setStyle(ButtonStyle.Secondary)
            .setURL('https://youtube.com');

        const row = new ActionRowBuilder().addComponents(
            KishGithub,
            KhoaGithub
        );

        await interaction.reply({
            content: "Developer's Githubs: ",
            components: [row],
        });
    },
};
