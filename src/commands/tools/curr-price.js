const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-price')
        .setDescription('Gets Current Stock Price!')
        .addStringOption((option) =>
            option
                .setRequired(true)
                .setName('stock-name')
                .setMaxLength(20)
                .setDescription('Get the live stock price of any stock')
        ),

    async execute(interaction, client) {
        const name = interaction.options.getString('stock-name');
        const { stocks } = client;
        try {
            // fix from here
            const results = await stocks.timeSeries({
                symbol: 'TSLA',
                interval: '30min',
                amount: 10,
            });

            const string = await interaction.reply({
                content: JSON.stringify(results),
            });
            console.log(results);
        } catch (err) {
            await interaction.reply({
                content: 'that is not a stock name',
            });
        }
    },
};
