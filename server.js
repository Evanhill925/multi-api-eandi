const dotenv = require('dotenv');
const fs = require('node:fs');
const path = require('node:path');


dotenv.config();



var cors = require('cors')
const bodyParser = require('body-parser')

const express = require("express");
const res = require('express/lib/response');
const app = express()
const PORT = 8001
const { Client , Events} = require('discord.js-selfbot-v13');
const { channel } = require('node:diagnostics_channel');
var a = ""

// app.use(bodyParser.urlencoded())
app.use(express.urlencoded({
	extended:true
}) )
app.use(express.json());





app.use(cors())
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
	});




// app.public(express.st
// app.public(express.static(__dirname + '/public/dist/public'));
app.use(express.static('public'))

// function direct(){
// 	response.render(__dirname + "/index2.html", {name:image})
// 	}

app.engine('html', require('ejs').renderFile);


const client = new Client({
	// See other options here
	// https://discordjs-self-v13.netlify.app/#/docs/docs/main/typedef/ClientOptions
	// All partials are loaded automatically
	checkUpdate: false,
});

client.login(process.env.token);




app.get('/',(request,response)=>{
    response.render(__dirname + "/index.html")
})




app.get('/main.js',(request,response)=>{
    response.sendFile(__dirname + "/main.js")
})

app.listen(PORT,()=>{
    console.log(`This server is running on port ${PORT}`)
})

app.post("/addPrompt", (request,response)=>{

	
	// response.render(__dirname + "/index2.html", {name:'collected.first().attachments.first().url',message_id: '1115790695245021274'})

	// console.log(adasdasdasd)()
	
	console.log(request.body)
	let a = request.body.userInput
	console.log(a)
	const channel = client.channels.cache.get('1103168663617556571');
	channel.sendSlash('936929561302675456','imagine', a)
	channel.send(a)
	console.log(client.uptime)
	console.log(client.isReady())

	// const filter = m => m.content.startsWith('!vote');
	const filter = m => m.content.startsWith(`**${a}`)&&m.attachments.size==1&&m.author.id =='936929561302675456'

// Errors: ['time'] treats ending because of the time limit as an error
 var result = channel.awaitMessages({ filter, max: 1, time: 120_000, errors: ['time'] })
  .then(collected=> response.render(__dirname + "/index2.html", {name:collected.first().attachments.first().url,message_id: collected.first().id}))
  .catch(collected => console.log(`After a minute, only ${collected.size} ${collected} out of 4 voted.`));
  console.log(result)

	})
	


function tester(){
	console.log('testeris running')
	

	client.on('ready', () => {
		console.log('client is ready to listen for messages')
	const channel = client.channels.cache.get("1103168663617556571");
	channel.send(a)}
	)

}





	// response.redirect(`/?lastMessageId=${channel.lastMessageId}`))})


app.post("/checkmessage", async (request,response)=>{


	console.log(request.body)
	// console.log(request.)


	var targetmessage = request.body.message_id
	// const test_channel = '1103168663617556571'

	const channel = client.channels.cache.get('1103168663617556571');
	console.log(targetmessage)

	
	


	const message = await channel.messages.fetch(request.body.message_id)
	// console.log(message)
	// console.log(message.components[0])
	// console.log(message.components[0][0])

	


	
	// .then(message=>message.clickButton({ row: button_row, col: button_column}));
	message.clickButton({ row:request.body.row_, col: request.body.columns_})



	const filter = m => m.attachments.size==1&&m.author.id =='936929561302675456'&&m.reference.messageId == request.body.message_id

	var last = await channel.awaitMessages({ filter, max: 1, time: 60_000, errors: ['time'] })
//   .then(collected=> response.render(__dirname + "/index2.html", {name:collected.first().attachments.first().url,message_id:collected.first().id}))
//   .catch(collected => console.log(`After a minute, only ${collected.size} out of 4 voted.`));
  

//   .then(response => {
// 	window.location.reload(true)
//   })



	console.log('does this code ever excute?')


	 
	});




	




function message_verify(mes){
	console.log(mes.first().author);
	console.log(mes.first().content);
	var message = mes.first();
	// image = message.attachments.first()?.url
	console.log(`Message from ${message.author.username}: ${message.content}`);
	console.log('------');
	return message.attachments.first()?.url

}



// client.on('ready', () => {
// 	console.log('client is ready to listen for messages')
// const channell = client.channels.cache.get("1103168663617556571");
// var button_column = 3
// var button_row = 1

// const message =  channell.messages.fetch('1115144157342736464').then(collected => 
// 																	collected.clickButton({ row: button_row, col: button_column})
// 																	)



// console.log(message)
// console.log(`**${a}`)
// const filter = m => m.content.startsWith(`**${a}`)&&m.attachments.size==1&&m.author.id =='936929561302675456'&&m.reference.messageId == '1115144157342736464'


// channell.awaitMessages({ filter, max: 1, time: 120_000, errors: ['time'] })
//   .then(collected => console.log(collected))
//   .catch(collected => console.log(`After a minute, only ${collected.first().attachments.first()?.url} out of 4 voted.`));
// })
