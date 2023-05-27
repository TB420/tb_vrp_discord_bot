const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "check",
    description: "Check A Car Report",
    options: [
        {
            name: "reportid",
            description: "Report ID",
            type: 3,
            required: true,
        }
    ],
    run: async (client, interaction) => {
        let fivemexports = client.fivemexports;
        let level = client.getPerms(interaction.member);     
        let reportid = interaction.options.getString('reportid')   
        if (level > 0) {
            fivemexports.ghmattimysql.execute("SELECT * FROM cardev WHERE reportid = ?", [reportid], (result) => {
                if (result[0]) {
                    if (result[0].completed == true) {
                        const embed = new EmbedBuilder()
                        .setTitle("Car Report")
                        .setDescription(`Spawn Code: **${result[0].spawncode}**\n\nIssue: **${result[0].issue}**\n\nReporter: **<@${result[0].claimed}>**\n\nClaimed: **<@${result[0].reporter}>**\n\nNotes: **${result[0].notes}**\n\n`)
                        .setColor(0x0099FF)
                        .setTimestamp(new Date())
                        interaction.reply({ embeds: [embed] });
                    } else {
                        if (result[0].claimed) {
                            const embed = new EmbedBuilder()
                            .setTitle("Car Report")
                            .setDescription(`Spawn Code: **${result[0].spawncode}**\n\nIssue: **${result[0].issue}**\n\nReporter: **<@${result[0].claimed}>**\n\nClaimed: **<@${result[0].reporter}>**\n\nCompleted: **False**\n\n`)
                            .setColor(0x0099FF)
                            .setTimestamp(new Date())
                            interaction.reply({ embeds: [embed] });
                        } else {
                            const embed = new EmbedBuilder()
                            .setTitle("Car Report")
                            .setDescription(`Spawn Code: **${result[0].spawncode}**\n\nIssue: **${result[0].issue}**\n\nReporter: **<@${result[0].reporter}>**\n\nClaimed: **False**\n\n`)
                            .setColor(0x0099FF)
                            .setTimestamp(new Date())
                            interaction.reply({ embeds: [embed] });
                        }
                    }
                } else {
                    const embed = new EmbedBuilder()
                    .setTitle("Car Report")
                    .setDescription(`Report Not Found. *If you think there is an issue, contact a developer.*\n\n`)
                    .setColor(0x0099FF)
                    .setTimestamp(new Date())
                    interaction.reply({ embeds: [embed] });
                }
            })
        }
    },
};