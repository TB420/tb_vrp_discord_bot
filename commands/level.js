module.exports = {
    name: "level",
    description: "View perm level.",
    options: [],
    run: async (client, interaction) => {
        let level = client.getPerms(interaction.member);
        if (level == 3) { 
            interaction.reply("Your permission level is 3!");
        } else if (level == 2) {
            interaction.reply("Your permission level is 2!");
        } else if (level == 1) {
            interaction.reply("Your permission level is 1!");
        } else {
            interaction.reply("Your permission level is 0!");
        }
    },
};