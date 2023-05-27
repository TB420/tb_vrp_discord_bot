const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "addgroup",
    description: "Add Group To User ID",
    options: [
        {
            name: "perm_id",
            description: "Users Perm ID",
            type: 4,
            required: true,
        },
        {
            name: "group",
            description: "Group Name",
            type: 3,
            required: true,
        }
    ],
    run: async (client, interaction) => {
        let fivemexports = client.fivemexports;
        let level = client.getPerms(interaction.member);
        if (level >= 2) { 
            let permid = interaction.options.getInteger('perm_id')
            let group = interaction.options.getString('group')
            fivemexports.vrp.vrpbot("getUserSource", [permid], (result) => {
                if (result !== null) {
                    fivemexports.vrp.vrpbot("addUserGroup", [permid, group], (result) => {})
                } else {
                    fivemexports.ghmattimysql.execute("SELECT * FROM `vrp_user_data` WHERE user_id = ? AND dkey = ?", [permid, "vRP:datatable"], (result) => {
                        if (result.length > 0) {
                            let dvalue = JSON.parse(result[0].dvalue)
                            let groups = dvalue.groups
                            groups[group] = true;
                            fivemexports.ghmattimysql.execute("UPDATE `vrp_user_data` SET dvalue = ? WHERE user_id = ?", [JSON.stringify(dvalue), permid])
                        }
                    })
                }
            })

            const embed = new EmbedBuilder()
            .setTitle("Added Group To User")
            .setDescription(`\nPerm ID: **${permid}**\nGroup Name: **${group}**\n\nAdmin: <@${interaction.user.id}>`)
            .setColor(0x0099FF)
            interaction.reply({ embeds: [embed] });
        } 

    },
};