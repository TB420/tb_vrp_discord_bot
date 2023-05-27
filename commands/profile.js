const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "profile",
    description: "Gets Users Profile",
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
        embed = {
              "type": "rich",
              "title": `User Info`,
              "description": `Perm ID: **1**\nNickname:`,
              "color": 0x00FFFF,
              "timestamp": new Date(),
              "fields": [
                {
                  "name": `Groups:`,
                  "value": `Large Arms Access, AdvancedRebel, TutorialDone, Highroller, Senior Mod, Rebel, Supporter, NPAS, Chief Superintendent Clocked, Gang, K9 Trained, Chief Superintendent`,
                  "inline": true
                },
                {
                  "name": `Money:`,
                  "value": `Wallet Balance: £10000\nBank Balance: £10000`,
                  "inline": true
                },
                {
                  "name": `Banned:`,
                  "value": `User Is **NOT** Banned.`
                },
                {
                  "name": `Hours:`,
                  "value": `User Has Played 1000 Hours.`
                }
              ]
        }
        
        if (level >= 1) { 
            let permid = interaction.options.getInteger('perm_id')
            fivemexports.ghmattimysql.execute("SELECT * FROM `vrp_user_data` WHERE user_id = ? AND dkey = ?", [permid, "vRP:datatable"], (result) => {
                obj = JSON.parse(result[0].dvalue).groups
                embed.fields[0].value = `${(JSON.stringify(Object.keys(obj)).replace(/"/g, '').replace('[', '').replace(']', '')).replace(/,/g, ', ')}`
                fivemexports.ghmattimysql.execute("SELECT * FROM `vrp_user_moneys` WHERE user_id = ?", [permid], (result) => {
                    embed.fields[1].value = `Wallet Balance: £${result[0].wallet}\nBank Balance: £${result[0].bank}`
                    fivemexports.ghmattimysql.execute("SELECT * FROM `vrp_users` WHERE id = ?", [permid], (result) => {
                        if (result[0].banned == 0 ){
                            embed.fields[2].value = `User Is **NOT** Banned.`
                        } else {
                            embed.fields[2].value = `User Is Banned For **${result[0].banreason}** Time Remaining: **${result[0].bantime}**`
                        }
                        embed.fields[3].value = `User Has Played **${result[0].playtime}** Hours.`
                        embed.description = `Perm ID: **${permid}**\nNickname: **${result[0].username}**`
                        interaction.reply({ embeds: [embed] });
                    })
                })
            })
        } else {
            const embed = new EmbedBuilder()
            .setTitle("Invalid Permissions")
            .setDescription("You do not have the required permissions to run this command.")
            .setColor(0x0099FF)
            .setTimestamp(new Date())
            interaction.reply({ embeds: [embed] });
        }

    },
};