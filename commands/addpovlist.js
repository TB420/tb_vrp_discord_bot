const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "addpovlist",
    description: "Puts The User On POV List",
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
        if (level >= 2) { 
            let permid = interaction.options.getInteger('perm_id')
            fivemexports.ghmattimysql.execute("SELECT * FROM `vrp_user_data` WHERE user_id = ?", [permid], (result) => {
                if (result.length > 0) {
                    let dvalue = JSON.parse(result[0].dvalue)
                    let groups = dvalue.groups
                    groups['pov'] = true;
                    fivemexports.ghmattimysql.execute("UPDATE `vrp_user_data` SET dvalue = ? WHERE user_id = ?", [JSON.stringify(dvalue), permid])
                }
            })
        
            const embed = new EmbedBuilder()
            .setTitle("Added to Pov List")
            .setDescription(`\nPerm ID: **${permid}**\n\nAdmin: <@${interaction.user.id}>`)
            .setColor(0x0099FF)
            .setTimestamp(new Date())
            interaction.reply({ embeds: [embed] });
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