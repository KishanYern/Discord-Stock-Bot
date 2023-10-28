const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('devs-github')
        .setDescription("Returns buttons to dev's githubs!"),

    async execute(interaction, client) {
        const KhoaGitBtn = new ButtonBuilder()
            .setCustomId('KhoaGit')
            .setLabel("Khoa's Github")
            .setStyle(ButtonStyle.Primary);

        const KishGitBtn = new ButtonBuilder()
            .setCustomId('KishGit')
            .setLabel("Kishan's Github")
            .setStyle(ButtonStyle.Secondary);

        await interaction.reply({
            components: [
                new ActionRowBuilder().addComponents(KhoaGitBtn, KishGitBtn),
            ],
        });
    },
};
