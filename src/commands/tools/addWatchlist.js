const { SlashCommandBuilder } = require('discord.js');
const watchlist = require('../../schemas/watchlist');
const mongoose = require('mongoose');
const liveStockPrice = require('live-stock-price');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-watchlist')
        .setDescription('Add a stock to your watchlist!')
        .addStringOption((option) =>
            option
                .setRequired(true)
                .setName('stock-name')
                .setDescription(
                    'Which stock would you like to add to your watch-list'
                )
        ),

    async execute(interaction, client) {
        const stock_name = interaction.options.getString('stock-name');
        let userWatchlist = await watchlist.findOne({
            userId: interaction.user.id,
        });
        let currPrice;

        try {
            currPrice = await liveStockPrice(stock_name);
        } catch (err) {
            await interaction.reply({
                content: `${stock_name} is not a valid stock name`,
                ephemeral: true,
            });
            console.log(`${stock_name} is not a valid stock name`);
            return;
        } // check if the stock exists

        if (!userWatchlist) {
            // user is not in the database
            userWatchlist = await new watchlist({
                _id: new mongoose.Types.ObjectId(),
                userName: interaction.user.username,
                userId: interaction.user.id,
                userWatchlistItems: [stock_name],
            });
            userWatchlist.save().catch(console.error);

            await interaction.reply({
                content: `A watchlist had been created and ${stock_name} has been added to your watchlist. \nThe current price of ${stock_name} is: $${currPrice}`,
            });
        } else {
            userWatchlist.userWatchlistItems.push(stock_name);
            userWatchlist.save().catch(console.error);
            await interaction.reply({
                content: `${stock_name} has been added to your watchlist. \nThe current price of ${stock_name} is: $${currPrice}`,
            });
        }
    },
};
