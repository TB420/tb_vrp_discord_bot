const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "ch",
    description: "Check A Users Hours",
    options: [
        {
            name: "perm_id",
            description: "Users Perm ID [Blank For Self]",
            type: 4,
        },
    ],
    run: async (client, interaction) => {
        let fivemexports = client.fivemexports;
        let level = client.getPerms(interaction.member);        
        let permid = interaction.options.getInteger('perm_id')
        if (permid) {
            let user = permid
            fivemexports.ghmattimysql.execute("SELECT * FROM `vrp_users` WHERE id = ?", [permid], (result) => {
                const embed = new EmbedBuilder()
                .setTitle("User Hours")
                .setDescription("Perm ID: **" + permid + "**\nHours: **" + result[0].playtime + "**\n")
                .setColor(0x0099FF)
                .setTimestamp(new Date())
                interaction.reply({ embeds: [embed] });
            })
        } else {
            let user = interaction.user.id
            fivemexports.ghmattimysql.execute("SELECT * FROM `vrp_user_ids` WHERE identifier = ?", ["discord:" + user], (result) => {
                if (result.length > 0) {
                    fivemexports.ghmattimysql.execute("SELECT * FROM `vrp_users` WHERE id = ?", [result[0].user_id], (result) => {
                        const embed = new EmbedBuilder()
                        .setTitle("User Hours")
                        .setDescription("Perm ID: **" + result[0].id + "**\nHours: **" + result[0].playtime + "**\n")
                        .setColor(0x0099FF)
                        .setTimestamp(new Date())
                        interaction.reply({ embeds: [embed] });
                    })
                } else {
                    interaction.reply('No account is linked for this user.')
                }
            });
        }


    },
};