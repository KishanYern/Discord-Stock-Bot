const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reactor')
        .setDescription('Returns reactions'),

    async execute(interaction, client) {
        const message = await interaction.reply({
            content: 'React Here!',
            fetchReply: true,
        });

        const emoji = client.emojis.cache.find(
            (emoji) => emoji.id == '1168322296210002025'
        );

        message.react(emoji);

        const filter = (reaction, user) => {
            return (
                reaction.emoji.id == emoji.id && interaction.user.id == user.id
            );
        };

        const collector = message.createReactionCollector({
            filter,
            time: 5000,
        });

        const reactedUsers = [];

        const channel = client.channels.cache.get('1167960273290793000');

        collector.on('collect', (reaction, user) => {
            console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
            reactedUsers.push(user.id);
        });

        collector.on('end', (collected) => {
            console.log(`Collected ${collected.size} items`);
            channel.send('Reacted Users:');
            for (const user of reactedUsers) {
                channel.send(`<@${user}>`);
            }
        });
    },
};
