const { SlashCommandBuilder } = require('discord.js');
const User = require('../../schemas/user');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Registers user')
        .addStringOption((option) =>
            option
                .setName('name')
                .setDescription('What is your name?')
                .setAutocomplete(false)
                .setRequired(true)
        )
        .addNumberOption((option) =>
            option
                .setName('age')
                .setDescription('How old are you?')
                .setAutocomplete(false)
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('fav-stock')
                .setDescription('Out of these, which is your favorite stock?')
                .setAutocomplete(false)
                .setRequired(false)
        ),

    async execute(interaction, client) {
        const favStock = interaction.options.getString('fav-stock');
        const name = interaction.options.getString('name');
        const age = interaction.options.getNumber('age');
        let userProfile = await User.findOne({ userId: interaction.user.id });

        if (!userProfile) {
            // if user is not in database
            userProfile = await new User({
                _id: new mongoose.Types.ObjectId(),
                userPreferedName: name,
                userName: interaction.user.username,
                userId: interaction.user.id,
                userIcon: interaction.user.avatarURL() || null,
                userAge: age,
                userFavStock: favStock || null,
            });
            userProfile.save().catch(console.error);
            await interaction.reply({
                content: `You have been registered in **${interaction.guild.name}**!`,
            });
        } else {
            await interaction.reply({
                content: `${userProfile.userPreferedName} is already registered in the database! If you want to update your profile, try the /update-profile command.`,
            });
        }
    },
};
