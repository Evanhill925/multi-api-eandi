const dotenv = require('dotenv');
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');



dotenv.config();


const client = new Client({ 
	intents: [GatewayIntentBits.Guilds] 
});

client.commands = new Collection();


// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	const channel = client.channels.cache.get('1103168663617556571');
	channel.send('content');

});



client.login(process.env.token);