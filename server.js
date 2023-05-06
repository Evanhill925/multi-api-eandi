const dotenv = require('dotenv');
const fs = require('node:fs');
const path = require('node:path');



dotenv.config();



const express = require("express");
const res = require('express/lib/response');
const app = express()
const PORT = 8001
const { Client , Events} = require('discord.js-selfbot-v13');
const { channel } = require('node:diagnostics_channel');


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




function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


client.on("messageCreate", async (message) => {
	if (message.author.id == '936929561302675456'){
	 console.log(message.attachments.first())
	 console.log(`Message from ${message.author.username}: ${message.content}`)
	 console.log('------')
	 id = message.id
	 //disabled for bobby
	//  channel = message.channelId
	 console.log(message.attachments.size)
	}
	if (message.attachments.size==1){
		console.log(message.attachments.first().url)
		image = message.attachments.first()?.url
		//disabled for bobby
		// channel.message(image)

	}
	
	if (message.author.id !='936929561302675456'){
		if (message.content.startsWith('!img')){
			var test = client.channels.cache.get('1103168663617556571')
			test.sendSlash('936929561302675456','imagine', message.content.slice(5))
			
		}
	}
	

	// await sleep(10000)
	// console.log(message.attachments.first().url)
	// image = message.attachments.first()?.url
	
	// channel = client.channels.cache.get(channel);
}
	
	
	
	// message = await channel.messages.fetch(id);
	// // console.log(message)
	// console.log(message.attachments)
	// console.log('------')
	// console.log(message.attachments.first()?.url)
	// image = message.attachments.first()?.url



	
	
  );
  
//   client.login(process.env.BOT_TOKEN);




