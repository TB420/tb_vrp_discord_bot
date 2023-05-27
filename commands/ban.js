const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "ban",
    description: "Bans A User From The Server",
    options: [
        {
            name: "perm_id",
            description: "Users Perm ID",
            type: 4,
            required: true,
        },
        {
            name: "duration",
            description: "Ban Duration",
            type: 3,
            required: true,
        },
        {
            name: "reason",
            description: "Ban Reason",
            type: 3,
            required: true,
        }  
    ],
    run: async (client, interaction) => {
        let fivemexports = client.fivemexports;
        let level = client.getPerms(interaction.member);        
        if (level >= 2) { 
            console.log(interaction)
            let permid = interaction.options.getInteger('perm_id')
            let duration = interaction.options.getString('duration')
            let reason = interaction.options.getString('reason')

            if (duration == "-1") {
                let newval = fivemexports.vrp.vrpbot('banConsole', [permid, "perm", `${reason}`])
                let newval1 = fivemexports.vrp.vrpbot('saveBanLog', [permid, interaction.user.username, `${reason}`, "-1"])
            }
            else {
                let newval = fivemexports.vrp.vrpbot('banConsole', [permid, duration, `${reason}`])
                let newval1 = fivemexports.vrp.vrpbot('saveBanLog', [permid, interaction.user.username, `${reason}`, [duration]])
            }

            const embed = new EmbedBuilder()
            .setTitle("Banned Player")
            .setDescription(`\nPerm ID: **${permid}**\n\nDuration: **${duration}**\n\nReason: **${reason}**\n\nAdmin: **<@${interaction.user.id}>**`)
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