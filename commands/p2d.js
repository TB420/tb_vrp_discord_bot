const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "p2d",
    description: "Gets discod from permid",
    options: [
        {
            name: "permid",
            description: "Perm ID",
            type: 4,
            required: true,
        },
    ],
    run: async (client, interaction) => {
        let fivemexports = client.fivemexports;
        let level = client.getPerms(interaction.member);        
        let permid = interaction.options.getInteger('permid')
        if (level > 0) {
            fivemexports.ghmattimysql.execute("SELECT * FROM `vrp_user_ids` WHERE user_id = ?", [permid], (result) => {
                if (result.length > 0) {
                    for (i = 0; i < result.length; i++) {
                        if (result[i].identifier.includes('discord')) {
                            const embed = new EmbedBuilder()
                            .setTitle("Perm To Discord")
                            .setDescription(`\nSuccess! PermID to Discord.\n\n This user is: <@${result[i].identifier.split(":")[1]}>\n\n`)
                            .setColor(0x0099FF)
                            .setTimestamp(new Date())
                            interaction.reply({ embeds: [embed] });
                        }
                    }
                } else {
                    const embed = new EmbedBuilder()
                    .setTitle("Perm To Discord")
                    .setDescription(`\nFailed! There is no Discord linked to this PermID!\n\n`)
                    .setColor(0x0099FF)
                    .setTimestamp(new Date())
                    interaction.reply({ embeds: [embed] });

                }
            });
        } else {
            const embed = new EmbedBuilder()
            .setTitle("Perm To Discord")
            .setDescription(`\nFailed! You need to enter a valid PermID!\n\n`)
            .setColor(0x0099FF)
            .setTimestamp(new Date())
            interaction.reply({ embeds: [embed] });
        }
        
    },
};