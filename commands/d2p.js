const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "d2p",
    description: "Close A Car Report",
    options: [
        {
            name: "user",
            description: "Users Discord",
            type: 6,
            required: true,
        },
    ],
    run: async (client, interaction) => {
        let fivemexports = client.fivemexports;
        let level = client.getPerms(interaction.member);        
        let user = interaction.options.getUser('user')
        if (level > 0) {
            fivemexports.ghmattimysql.execute("SELECT * FROM `vrp_user_ids` WHERE identifier = ?", ["discord:" + user.id], (result) => {
                if (result.length > 0) {
                    const embed = new EmbedBuilder()
                    .setTitle("Discord To Perm ID")
                    .setDescription(`User: **<@${user.id}>**\n\nPerm ID: **${result[0].user_id}**\n\n`)
                    .setColor(0x0099FF)
                    .setTimestamp(new Date())
                    interaction.reply({ embeds: [embed] });
                } else {
                   interaction.reply('No account is linked for this user.')
                }
            });
        }
    },
};