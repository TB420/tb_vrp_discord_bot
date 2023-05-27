const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "checkban",
    description: "Check If A User Is Banned",
    options: [
        {
            name: "perm_id",
            description: "Users Perm ID",
            type: 4,
            required: true,
        },
    ],
    run: async (client, interaction) => {
        let fivemexports = client.fivemexports;
        let level = client.getPerms(interaction.member);        
        let permid = interaction.options.getInteger('perm_id')
        if (level > 0) {
            fivemexports.ghmattimysql.execute("SELECT * FROM `vrp_users` WHERE id = ?", [permid], (result) => {
                if (result[0].banned == 0 ){
                    const embed = new EmbedBuilder()
                    .setTitle("Check Ban")
                    .setDescription(`Perm Id **${permid}** Is **NOT** Banned`)
                    .setColor(0x0099FF)
                    .setTimestamp(new Date())
                    interaction.reply({ embeds: [embed] });
                } else {
                    const embed = new EmbedBuilder()
                    .setTitle("Check Ban")
                    .setDescription(`\nPerm ID **${permid}** **IS** Banned.\n\nReason: **${result[0].banreason}**\n\nTime Remaining: **${result[0].bantime}**\n\n`)
                    .setColor(0x0099FF)
                    .setTimestamp(new Date())
                    interaction.reply({ embeds: [embed] });
                }

            })
        }


    },
};