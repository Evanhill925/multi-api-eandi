const dotenv = require('dotenv');
const fs = require('node:fs');
const path = require('node:path');


dotenv.config();



const express = require("express");
const res = require('express/lib/response');
const app = express()
const PORT = 8001
const { Client , Events} = require('discord.js-selfbot-v13');


const client = new Client({
	// See other options here
	// https://discordjs-self-v13.netlify.app/#/docs/docs/main/typedef/ClientOptions
	// All partials are loaded automatically
	checkUpdate: false,
});

client.login(process.env.token);


app.use(express.urlencoded({
	extended:true
}) )


app.get('/',(request,response)=>{
    response.sendFile(__dirname + "/index.html")
})

app.listen(PORT,()=>{
    console.log(`This server is running on port ${PORT}`)
})

app.post("/addPrompt", (request,response)=>{
	

	let a = request.body.userInput
	console.log(a)
	const channel = client.channels.cache.get('1103168663617556571');
	channel.sendSlash('936929561302675456','imagine', a)
	response.redirect('/')
})


// client.on('messageCreate', async (message) => {
// 	if (message.author.id == 'Midjourney ID' && message.embeds && message.embeds[0].image) {
// 		image = message.embeds[0].image.url
// 		const channel = client.channels.cache.get('Channel ID')
// 		channel.send(message.content + '\n\n' + image)
// 	  }
// 	}) 
	