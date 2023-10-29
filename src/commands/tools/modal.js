const {
    SlashCommandBuilder,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fav-stock')
        .setDescription('Tell me what your favorite stock is!'),

    async execute(interaction, client) {
        const modal = new ModalBuilder()
            .setCustomId('fav-stock')
            .setTitle('What is your favorite stock?');

        const textInput = new TextInputBuilder()
            .setCustomId('favStockInput')
            .setLabel('What is your favorite stock?')
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

        modal.addComponents(new ActionRowBuilder().addComponents(textInput));

        await interaction.showModal(modal);
    },
};
