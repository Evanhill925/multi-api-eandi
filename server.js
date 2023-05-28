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
var a = ""

// app.public(express.static(__dirname + '/public/dist/public'));
app.use(express.static('public'))
function direct(){
	response.render(__dirname + "/index2.html", {name:image})
	}

app.engine('html', require('ejs').renderFile);



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




app.get('/main.js',(request,response)=>{
    response.sendFile(__dirname + "/main.js")
})

app.listen(PORT,()=>{
    console.log(`This server is running on port ${PORT}`)
})

app.post("/addPrompt", (request,response)=>{
	

	let a = request.body.userInput
	console.log(a)
	const channel = client.channels.cache.get('1103168663617556571');
	channel.sendSlash('936929561302675456','imagine', a)
	// channel.send(a)
	console.log(channel.lastMessageId)
	console.log(channel.lastMessage)
	// var holder = "https://cdn.discordapp.com/attachments/1103168663617556571/1112219753755443220/lilhelper_yoda_being_flushed_down_a_toilet_3c563fb5-5c72-42c8-90a6-dd79f2698def.png"

	// response.render(__dirname + "/index2.html", {name:holder})

	client.on("messageCreate", async (message) => {
		if (message.author.id == '936929561302675456'&& message.content.startsWith(`**${a}`)&&message.attachments.size==1){
		 console.log(message.attachments.first())
		 console.log(`Message from ${message.author.username}: ${message.content}`)
		 console.log('------')
		 id = message.id
		 image = message.attachments.first()?.url
		//disabled for bobby
		// channel.send(image)
		 console.log(message.content)
		//  response.render(__dirname + "/index2.html", {name:image})
		setTimeout(direct, 5000);



		}});

	function direct(){
		response.render(__dirname + "/index2.html", {name:image})
		}




	// response.redirect(`/?lastMessageId=${channel.lastMessageId}`)
})
