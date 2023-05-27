const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const settingsjson = require("./settings.js");
const resourcePath = global.GetResourcePath ? global.GetResourcePath(global.GetCurrentResourceName()) : global.__dirname
console.log(resourcePath)
const client = new Client({
	partials: [
		Partials.Message, // for message
		Partials.Channel, // for text channel
		Partials.GuildMember, // for guild member
		Partials.Reaction, // for message reaction
		Partials.GuildScheduledEvent, // for guild events
		Partials.User, // for discord user
		Partials.ThreadMember, // for thread member
	],
	intents: [
		GatewayIntentBits.Guilds, // for guild related things
		GatewayIntentBits.GuildMembers, // for guild members related things
		GatewayIntentBits.GuildBans, // for manage guild bans
		GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
		GatewayIntentBits.GuildIntegrations, // for discord Integrations
		GatewayIntentBits.GuildWebhooks, // for discord webhooks
		GatewayIntentBits.GuildInvites, // for guild invite managing
		GatewayIntentBits.GuildVoiceStates, // for voice related things
		GatewayIntentBits.GuildPresences, // for user presence things
		GatewayIntentBits.GuildMessages, // for guild messages things
		GatewayIntentBits.GuildMessageReactions, // for message reactions things
		GatewayIntentBits.GuildMessageTyping, // for message typing things
		GatewayIntentBits.DirectMessages, // for dm messages
		GatewayIntentBits.DirectMessageReactions, // for dm message reaction
		GatewayIntentBits.DirectMessageTyping, // for dm message typing
		GatewayIntentBits.MessageContent, // enable if you need message content things
	],
});

module.exports = client;

client.getPerms = function(member) {
	let settings = settingsjson.settings
	let lvl1 = settings.Level1Perm;
	let lvl2 =settings.Level2Perm;
	let lvl3 = settings.Level3Perm;

	let level = 0 

	if (member._roles.includes(lvl3)) {
		level = 3
	} else if (member._roles.includes(lvl2)) {
		level = 2
	} else if (member._roles.includes(lvl1)) {
		level = 1
	}
	return level 
}

client.fivemexports = exports
fs.readdir(resourcePath + "/events", (_err, files) => {
	files.forEach((file) => {
		if (!file.endsWith(".js")) return;
		const event = require(`./events/${file}`);
		let eventName = file.split(".")[0];
		console.log(`👌 Loadded Event: ${eventName}`);
		client.on(eventName, event.bind(null, client));
		delete require.cache[require.resolve(`./events/${file}`)];
	});
});

if (settingsjson.settings.StatusEnabled) {
    setInterval(() => {
        const channelid = client.channels.cache.get(settingsjson.settings.StatusChannel)
        if (!channelid) return console.log(`[^1TB Discord Bot^7]: Status channel is not available / cannot be found.`)
        let settingsjsons = require(resourcePath + '/params.json')
        let totalSeconds = (client.uptime / 1000);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        exports.vrp.vrpbot("getUsersByPermission", ["staff.mode"], (result) => {
            staffOnline = result.length
        })
		exports.vrp.vrpbot("getUsersByPermission", ["police.clocked.on"], (result) => {
            policeOnline = result.length
        })
		exports.vrp.vrpbot("getUsersByPermission", ["nhs.clocked.on"], (result) => {
        	nhsOnline = result.length
        })
        channelid.messages.fetch(settingsjsons.messageid).then(message => {
            let status = {
                "color": 0x0099FF,
                "fields": [{
                        "name": "Players :person_fencing:",
                        "value": `${GetNumPlayerIndices()}/${GetConvarInt("sv_maxclients",32)}`,
                        "inline": true
                    },
                    {
                        "name": "Staff Online :guard:",
                        "value": `${staffOnline}`,
                        "inline": true
                    },
					{
                        "name": "Police Online :police_officer:",
                        "value": `${policeOnline}`,
                        "inline": true
                    },
					{
                        "name": "NHS Online :syringe:",
                        "value": `${nhsOnline}`,
                        "inline": true
                    },
                    {
                        "name": "Uptime :arrow_up:",
                        "value": `${hours} hours, ${minutes} minutes`,
                        "inline": false
                    }
                ],
                "title": "TB Discord Bot Status",
                footer: {
                    text: `F8 > connect ${settingsjson.settings.ServerIP}`
                }
            }
			message.edit({embeds: [status]})
        }).catch(err => {
            channelid.send("Status Starting").then(id => {
                settingsjsons.messageid = id.id
                fs.writeFile(`${resourcePath}/params.json`, JSON.stringify(settingsjsons), function(err) {});
                return
            })
        })
    }, 1000);
}
client.commands = [];
fs.readdir(resourcePath + "/commands", (err, files) => {
	if (err) throw err;
	files.forEach(async (f) => {
		try {
			let props = require(`./commands/${f}`);
			client.commands.push({
				name: props.name,
				description: props.description,
				options: props.options
			});
			console.log(`Loaded command: ${props.name}`);
		} catch (err) {
			console.log(err);
		}
	});
});

client.login(settingsjson.settings.token || process.env.TOKEN).catch(e => {
	console.log("The Bot Token You Entered Into Your Project Is Incorrect Or Your Bot's INTENTS Are OFF!");
});
