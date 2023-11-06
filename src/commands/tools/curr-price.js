const { SlashCommandBuilder } = require('discord.js');
const liveStockPrice = require('live-stock-price');

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
        try {
            const price = await liveStockPrice(name);
            await interaction.reply({
                content: `The current stock price of **${name}** is: $${price}`,
            });
        } catch (err) {
            await interaction.reply({
                content: 'that is not a stock name',
            });
        }
    },
};
