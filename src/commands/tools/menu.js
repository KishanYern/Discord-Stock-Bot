const {
    SlashCommandBuilder,
    StringSelectMenuBuilder,
    ActionRowBuilder,
    StringSelectMenuOptionBuilder,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stock-options')
        .setDescription('Returns a stock option menu!'),

    async execute(interaction, client) {
        const menu = new StringSelectMenuBuilder()
            .setCustomId('stock-menu')
            .setMinValues(1)
            .setMaxValues(1)
            .setPlaceholder('Select an Option')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Get live stock prices!')
                    .setValue('https://finance.yahoo.com/'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Make live trades!')
                    .setValue('https://www.webull.com')
            );

        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(menu)],
        });
    },
};
