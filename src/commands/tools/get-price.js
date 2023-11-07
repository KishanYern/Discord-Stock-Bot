const { SlashCommandBuilder } = require('discord.js');
const liveStockPrice = require('live-stock-price');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-current-price')
        .setDescription('Return my ping!')
        .addStringOption((option) =>
            option
                .setName('stock-name')
                .setDescription('What stock do you want the current price of?')
                .setRequired(true)
        ),

    async execute(interaction, client) {
        const stock_name = interaction.options.getString('stock-name');
        try {
            const data = await liveStockPrice(stock_name);
            interaction.reply({
                content: `Current price of **${stock_name}** is: $${data}`,
            });
        } catch (err) {
            console.log(err);
            interaction.reply({
                content: 'Invalid Stock Name!',
            });
        }
    },
};
