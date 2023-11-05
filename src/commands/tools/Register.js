const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('Register')
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
                .setRequired(true)
        ),

    async autocomplete(interaction, client) {
        const focusedValue = interaction.options.getFocused();
        let choices;
        const filtered = choices.filter((choice) =>
            choice.startsWith(focusedValue)
        );
        await interaction.respond(
            filtered.map((choice) => ({ name: choice, value: choice }))
        );
    },

    async execute(interaction, client) {
        const stock = interaction.options.getString('fav-stock');
        const name = interaction.options.getString('name');
        const age = interaction.options.getNumber('age');
        await interaction.reply({
            content: `Hello ${name}, You are ${age} years old and your favorite stock is: **${stock}**`,
        });
    },
};

// can use SQL or mongodb for this to register
