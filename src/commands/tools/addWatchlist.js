const { SlashCommandBuilder } = require('discord.js');
const watchlist = require('../../schemas/watchlist');
const mongoose = require('mongoose');

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
                content: `A watchlist had been created and ${stock_name} has been added to your watchlist`,
            });
        } else {
            // watchlist.updateOne(
            //     { userId: interaction.user.id },
            //     {
            //         $set: {
            //             userWatchlistItems:
            //                 userWatchlist.userWatchlistItems.push(stock_name),
            //         },
            //     }
            // );

            userWatchlist.userWatchlistItems.push(stock_name);
            userWatchlist.save().catch(console.error);
            await interaction.reply({
                content: `${stock_name} has been added to your watchlist`,
            });
        }
    },
};
