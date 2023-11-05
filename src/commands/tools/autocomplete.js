const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('autocomplete')
        .setDescription('Returns Autocomplete!')
        .addStringOption((option) =>
            option
                .setName('fav-stock')
                .setDescription('Out of these, which is your favorite stock?')
                .setAutocomplete(true)
                .setRequired(true)
        ),

    async autocomplete(interaction, client) {
        const focusedValue = interaction.options.getFocused();
        const choices = [
            'Apple',
            'Tesla',
            'Google',
            'Amazon',
            'Microsoft',
            'Meta',
        ];
        const filtered = choices.filter((choice) =>
            choice.startsWith(focusedValue)
        );
        await interaction.respond(
            filtered.map((choice) => ({ name: choice, value: choice }))
        );
    },

    async execute(interaction, client) {
        const option = interaction.options.getString('fav-stock');
        await interaction.reply({
            content: `Your favorite stock is: **"${option}"**`,
        });
    },
};
