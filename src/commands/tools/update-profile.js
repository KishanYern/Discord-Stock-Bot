const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../schemas/user');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('update-profile')
        .setDescription('Updates your profile in the database!')
        .addStringOption((option) =>
            option
                .setRequired(false)
                .setName('name')
                .setDescription('Change your username')
        )
        .addStringOption((option) =>
            option
                .setRequired(false)
                .setName('fav-stock')
                .setDescription('Change your favorite stock')
        ),

    async execute(interaction, client) {
        const userProfile = await User.findOne({ userId: interaction.user.id });

        if (!userProfile) {
            await interaction.reply({
                content:
                    'You have not registered yet. Try using the /register command',
            });
            return;
        }
        const name =
            interaction.options.getString('name') ||
            userProfile.userPreferedName;
        const fav_stock =
            interaction.options.getString('fav-stock') ||
            userProfile.userFavStock;

        await userProfile.updateOne(
            { userId: interaction.user.id },
            { $set: { userName: name, userFavStock: fav_stock } }
        );
        await interaction.reply({
            content: 'Updated profile!',
        });
    },
};
