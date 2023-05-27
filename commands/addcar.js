const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "addcar",
    description: "Add Car To User ID",
    options: [
        {
            name: "perm_id",
            description: "Users Perm ID",
            type: 4,
            required: true,
        },
        {
            name: "spawn_code",
            description: "Vehichle Spawn Code",
            type: 3,
            required: true,
        }
    ],
    run: async (client, interaction) => {
        let fivemexports = client.fivemexports;
        let level = client.getPerms(interaction.member);
        if (level == 3) { 
            let permid = interaction.options.getInteger('perm_id')
            let car = interaction.options.getString('spawn_code')
            fivemexports.ghmattimysql.execute("INSERT INTO vrp_user_vehicles (user_id, vehicle) VALUES(?, ?)", [permid, car], (result) => {
                if (result) {
                    const embed = new EmbedBuilder()
                    .setTitle("Added Car")
                    .setDescription("Perm ID: **" + permid + "**\nSpawn Code: **" + car + "**\n")
                    .setColor(0x0099FF)
                    .setTimestamp(new Date())
                    interaction.reply({ embeds: [embed] });
                } else {
                    const embed = new EmbedBuilder()
                    .setTitle("Failed to add Car")
                    .setDescription("Perm ID **" + permid + "** already owns **" + car + "**")
                    .setColor(0x0099FF)
                    interaction.reply({ embeds: [embed] });
                }

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