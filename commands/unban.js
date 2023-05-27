const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "unban",
    description: "Unbans A User",
    options: [
        {
            name: "permid",
            description: "Users PermID",
            type: 4,
            required: true,
        }
    ],
    run: async (client, interaction) => {
        let fivemexports = client.fivemexports;
        let level = client.getPerms(interaction.member);        
        if (level > 0) {
            let permid = interaction.options.getInteger('permid')
            let newval = fivemexports.vrp.vrpbot('setBanned', [permid, false])
            const embed = new EmbedBuilder()
            .setTitle("Unbaned User")
            .setDescription(`PermID: **${permid}**\n\nAdmin: <@${interaction.user.id}>\n\n`)
            .setColor(0x0099FF)
            .setTimestamp(new Date())
            interaction.reply({ embeds: [embed] });
        
        }
    },
};