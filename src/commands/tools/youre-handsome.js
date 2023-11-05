const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('handsome')
        .setDescription('Call me handsome!'),

    async execute(interaction, client) {
        await interaction.reply({
            content: `${interaction.user} is handsome!`,
        });
    },
};
