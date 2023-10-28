const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('source-code')
        .setDescription('Provides link to source code in github'),

    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true,
        });
        const newMessage = `https://github.com/KishanYern/Discord-Stock-Bot.git`;
        await interaction.editReply({
            content: newMessage,
        });
    },
};
