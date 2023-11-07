const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-price-intervals')
        .setDescription('Gets Current Stock Price!')
        .addStringOption((option) =>
            option
                .setRequired(true)
                .setName('stock-name')
                .setMaxLength(20)
                .setDescription('Get the live stock price of any stock')
        )
        .addStringOption((option) =>
            option
                .setRequired(true)
                .setName('interval-time')
                .setAutocomplete(true)
                .setDescription(
                    'What intervals lengths should the data be retrieved from?'
                )
        )
        .addIntegerOption((option) =>
            option
                .setRequired(true)
                .setName('amount')
                .setDescription(
                    'How many values in those intervals of time do you want?'
                )
        ),

    async autocomplete(interaction, client) {
        const focusedValue = interaction.options.getFocused();
        const choices = [
            '1min',
            '5min',
            '15min',
            '30min',
            '60min',
            'daily',
            'weekly',
            'monthly',
        ];

        const filtered = choices.filter((choice) =>
            choice.startsWith(focusedValue)
        );
        await interaction.respond(
            filtered.map((choice) => ({ name: choice, value: choice }))
        );
    },

    async execute(interaction, client) {
        const user_stock_name = interaction.options.getString('stock-name');
        const user_interval_time =
            interaction.options.getString('interval-time');
        const user_amount = interaction.options.getInteger('amount');

        const { stocks } = client;
        try {
            const results = await stocks.timeSeries({
                symbol: user_stock_name,
                interval: user_interval_time,
                amount: user_amount,
            });

            let parseString = `Data on **${user_stock_name}**:\n`;
            results.forEach((object) => {
                const { open, close, date } = object;
                parseString += `Opened at: $${open.toFixed(
                    2
                )} and Closed at: $${close.toFixed(2)} on ${date}`;
                parseString += '\n';
            });

            await interaction.reply({
                content: parseString,
            });
        } catch (err) {
            await interaction.reply({
                content: 'Something went wrong...',
            });
            console.log(err);
        }
    },
};
// can use live-stock-price API to get live prices and stocks.js API to get past values
