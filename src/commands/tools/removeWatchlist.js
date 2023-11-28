const { SlashCommandBuilder } = require('discord.js');
const watchlist = require('../../schemas/watchlist');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove-watchlist')
        .setDescription('Removes a item from your watchlist!')
        .addStringOption((option) =>
            option
                .setName('stock-name')
                .setDescription(
                    'Which stock should we remove from your watchlist? (Be careful of capitalization)'
                )
                .setRequired(true)
        ),

    async execute(interaction, client) {
        const userWatchlist = await watchlist.findOne({
            userId: interaction.user.id,
        });

        if (!userWatchlist) {
            await interaction.reply({
                content:
                    'You have not created a watchlist. Try using the **/add-watchlist** command to add a stock to your watchlist!',
                ephemeral: true,
            });
            return;
        }

        if (!userWatchlist.userWatchlistItems) {
            await interaction.reply({
                content:
                    'Your watchlist is empty. Try using the **/add-watchlist** command to add a stock!',
                ephemeral: true,
            });
            return;
        }

        const stockName = interaction.options.getString('stock-name');

        if (!userWatchlist.userWatchlistItems.includes(stockName)) {
            await interaction.reply({
                content: `${stockName} is not a stock that is in your watchlist. Try using the **/view-watchlist** command to see what is in your watchlist.`,
                ephemeral: true,
            });
            return;
        }

        userWatchlist.userWatchlistItems =
            userWatchlist.userWatchlistItems.filter(
                (item) => item !== stockName
            );
        userWatchlist.save().catch(console.error);

        await interaction.reply({
            content: `${stockName} has been removed from your watchlist. Try using the **/view-watchlist** command to view your current watchlist.`,
        });
    },
};
