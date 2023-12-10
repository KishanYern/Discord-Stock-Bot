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

        if (!userWatchlist.userWatchlistItems.length) {
            await interaction.reply({
                content:
                    'Your watchlist is empty or does not exist. Try using the **/add-watchlist** command',
                ephemeral: true,
            });
            return;
        } // empty watchlist check

        await interaction.reply({
            content: `${
                userWatchlist.userName
            }'s Watchlist:\n${userWatchlist.userWatchlistItems.join('\n')}`,
        });
    },
};
