const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "co",
    description: "Check All Owners Of A Car",
    options: [
        {
            name: "spawncode",
            description: "Car Spawn Code",
            type: 3,
            required: true,
        },
    ],
    run: async (client, interaction) => {
        let fivemexports = client.fivemexports; 
        let spawncode = interaction.options.getString('spawncode')
        fivemexports.ghmattimysql.execute("SELECT * FROM vrp_user_vehicles WHERE vehicle = ?", [spawncode], (result) => {
            if (result) {
                const embed = new EmbedBuilder()
                .setTitle("Car Count")
                .setDescription(`\nSuccess! There are: ${result.length} ${spawncode}'s in the city.`)
                .setColor(0x0099FF)
                .setTimestamp()
                interaction.reply({ embeds: [embed] })
            }
        })

    }
};