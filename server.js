const dotenv = require('dotenv');
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');



dotenv.config();






const { Console } = require("console")

const express = require("express");
const res = require('express/lib/response');
const app = express()
const PORT = process.env.port

app.get('/',(request,response)=>{
    response.sendFile(__dirname + "/index.html")
})

app.listen(PORT,()=>{
    console.log(`This server is running on port ${PORT}`)
})







const client = new Client({ 
	intents: [GatewayIntentBits.Guilds] 
});

client.commands = new Collection();


// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	const channel = client.channels.cache.get('1103168663617556571');
	// channel.send('content');

});



client.login(process.env.token);

app.post("/addPrompt", (request,res)=>{
	
	console.log(request)
	// console.log()
	let a = document.getElementById('input').value
	console.log(a)
	const channel = client.channels.cache.get('1103168663617556571');
	channel.send(a);
})