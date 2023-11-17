const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mutes a user')
        .addUserOption((option) =>
            option
                .setName('user-id')
                .setDescription('Tag the user to mute them')
                .setRequired(true)
        )
        .addNumberOption((option) =>
            option
                .setRequired(true)
                .setMinValue(1)
                .setName('time')
                .setDescription(
                    'How long should the user be muted for (in minutes)?'
                )
        ),

    async execute(interaction, client) {
        const user = interaction.options.getUser('user-id');
        const time = interaction.options.getNumber('time');

        const muteRole = interaction.guild.roles.cache.find(
            (role) => role.name === 'muted'
        );

        if (!muteRole) {
            return await interaction.reply({
                content: "There is no 'muted' role",
            });
        }

        try {
            const member = await interaction.guild.members.fetch(user);

            await member.roles.add(muteRole);

            await interaction.reply({
                content: `Successfully muted <@${user.id}> for ${time} minute(s).`,
            });

            // Set a timeout to unmute the user after the specified duration
            setTimeout(async () => {
                // Remove the mute role
                // Replace the following line with your actual unmuting logic
                await member.roles.remove(muteRole);
                // Inform the user that they have been unmuted
                await user.send(
                    `You have been unmuted in ${interaction.guild.name}`
                );
            }, time * 60000); // Convert minutes to milliseconds
        } catch (err) {
            interaction.reply({
                content: 'There is no such user.',
            });
        }
    },
};
