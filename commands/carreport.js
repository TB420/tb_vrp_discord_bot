const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "carreport",
    description: "Check If A User Is Banned",
    options: [
        {
            name: "spawncode",
            description: "Car Spawn Code",
            type: 3,
            required: true,
        },
        {
            name: "issue",
            description: "What needs changing?",
            type: 3,
            required: true,
        }
    ],
    run: async (client, interaction) => {
        let fivemexports = client.fivemexports;
        let level = client.getPerms(interaction.member);        
        let spawncode = interaction.options.getString('spawncode')
        let issue = interaction.options.getString('issue')
        if (level > 0) {
            let reporter = interaction.user.id
            let reportid = Math.floor(Math.random() * 100000)
            fivemexports.ghmattimysql.execute("INSERT INTO cardev (spawncode, issue, reporter, claimed,completed,notes) VALUES(?, ?,?, ?, ?,?)", [spawncode, issue, reporter,false, false, ""],(result)  =>  {
                fivemexports.ghmattimysql.execute("SELECT * FROM cardev WHERE reporter = ? AND spawncode = ? AND issue = ?", [interaction.user.id, spawncode, issue], (result) => {
                    const embed = new EmbedBuilder()
                    .setTitle("Car Report Subbmited")
                    .setDescription(`Spawn Code: **${spawncode}**\n\nIssue: **${issue}**\n\nReporter: **<@${interaction.user.id}>**\n\nReport ID: **${result[0].reportid}**\n\n`)
                    .setColor(0x0099FF)
                    .setTimestamp(new Date())
                    interaction.reply({ embeds: [embed] });
                });
            });
        }
    },
};