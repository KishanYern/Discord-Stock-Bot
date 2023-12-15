const { SlashCommandBuilder } = require('discord.js');
const watchlist = require('../../schemas/watchlist');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear-watchlist')
        .setDescription('Clears your current watchlist!'),

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

        userWatchlist.userWatchlistItems = [];
        userWatchlist.save().catch(console.error);

        await interaction.reply({
            content: 'Your watchlist has been cleared.',
        });
    },
};
