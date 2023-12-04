const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-technical-indicator')
        .setDescription('Retrives a technical indicator!')
        .addStringOption((option) =>
            option
                .setName('stock-name')
                .setRequired(true)
                .setDescription('What is the stock name?')
        )
        .addStringOption((option) =>
            option
                .setName('interval')
                .setRequired(true)
                .setDescription(
                    'What intervals lengths should the data be retrieved from?'
                )
                .setAutocomplete(true)
        )
        .addStringOption((option) =>
            option
                .setName('indicator')
                .setRequired(true)
                .setAutocomplete(true)
                .setDescription(
                    'What is the name of the indicator you want to use?'
                )
        )
        .addIntegerOption((option) =>
            option
                .setName('amount')
                .setRequired(true)
                .setDescription(
                    'How many values in those intervals of time do you want?'
                )
                .setMinValue(1)
        )
        .addIntegerOption((option) =>
            option
                .setName('time-period')
                .setDescription(
                    'the time period to calculate certain indicators from'
                )
                .setRequired(true)
                .setMinValue(1)
        ),

    async autocomplete(interaction, client) {
        const focusedValue = interaction.options.getFocused(true);
    },

    async execute(interaction, client) {},
};

//A technical indicator is a mathematical pattern derived from historical data used by technical traders or investors to predict future price trends and make trading decisions
