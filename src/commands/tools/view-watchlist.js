const { SlashCommandBuilder } = require('discord.js');
const watchlist = require('../../schemas/watchlist');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('view-watchlist')
        .setDescription('Returns your watchlist!'),

    async execute(interaction, client) {
        const userWatchlist = await watchlist.findOne({
            userId: interaction.user.id,
        });

        if (!userWatchlist) {
            await interaction.reply({
                content:
                    'You do not have a watchlist. Try using the **/add-watchlist** command',
                ephemeral: true,
            });
            return;
        }

        await interaction.reply({
            content: `${userWatchlist.userName}'s Watchlist:\n${userWatchlist.userWatchlistItems}`,
        });
    },
};
