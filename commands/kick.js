const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "kick",
    description: "Kick A User",
    options: [
        {
            name: "permid",
            description: "Users PermID",
            type: 4,
            required: true,
        },
        {
            name: "reason",
            description: "Reason For Kick",
            type: 3,
            required: true,
        }
    ],
    run: async (client, interaction) => {
        let fivemexports = client.fivemexports;
        let level = client.getPerms(interaction.member);   
        let permid = interaction.options.getInteger('permid')
        let reason = interaction.options.getString('reason')     
        if (level > 0) {
            fivemexports.vrp.vrpbot('getUserSource', [parseInt(permid)], function(d) {
                let newval = fivemexports.vrp.vrpbot('kick', [d, `You were kicked from the server via Discord for: ${reason} | Kicking Admin: ${interaction.user.name} (${interaction.user.id})`])
                const embed = new EmbedBuilder()
                .setTitle("Kicked User")
                .setDescription(`\nSuccess! Kicked User with PermID: **${permid}**\n\nReason: **${reason}**\n\n`)
                .setColor(0x0099FF)
                .setTimestamp(new Date())
                interaction.reply({ embeds: [embed] });
            })
        }
    },
};