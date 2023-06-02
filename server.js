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



// async function wait_for_image(prompt){
// 	return new Promise(resolve=>{
// 		console.log('dog was here')
// 		client.on("messageCreate", async (message) => {
// 			if (message.author.id == '936929561302675456'&& message.content.startsWith(`**${prompt}`)&&message.attachments.size==1){
// 			 console.log(message.attachments.first())
// 			 console.log(`Message from ${message.author.username}: ${message.content}`)
// 			 console.log('------')
// 			 id = message.id
// 			 image = message.attachments.first()?.url;
// 			 await image;
// 			 resolve( image);}})})}






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
	
	console.log(request.body)
	let a = request.body.userInput
	console.log(a)
	const channel = client.channels.cache.get('1103168663617556571');
	channel.sendSlash('936929561302675456','imagine', a)
	channel.send(a)
	console.log(client.uptime)
	console.log(client.isReady())
	// tester()

	// const filter = m => m.content.startsWith('!vote');
	const filter = m => m.content.startsWith(`**${a}`)&&m.attachments.size==1&&m.author.id =='936929561302675456'

// Errors: ['time'] treats ending because of the time limit as an error
channel.awaitMessages({ filter, max: 1, time: 120_000, errors: ['time'] })
//   .then(collected => console.log(collected.first().url))
  	//   .then(collected => message_verify(collected))
	//   .then(image =>console.log(image))
  .then(collected=> response.render(__dirname + "/index2.html", {name:collected.first().attachments.first().url}))
  .catch(collected => console.log(`After a minute, only ${collected.first().attachments.first()?.url} out of 4 voted.`));
	
	// client.on('ready',() =>{
	// 	console.log('CLIENT IS READY')
	// })



	// client.on('ready', () => {
	// 	console.log('client is ready to listen for messages');
	// // const channel = client.channels.cache.get("1103168663617556571");

	// const filter = m => m.author.id =='108716440764358656'
	// // const filter = m => m.content.startsWith(`**${a}`)&&m.attachments.size==1&&m.author.id =='936929561302675456'
	
	// // Errors: ['time'] treats ending because of the time limit as an error
	// channel.awaitMessages({ filter, max: 1, time: 60, errors: ['time'] })
	//   .then(collected => image =  message_verify(collected))
	//   .then(image =>console.log(image))
	//   .then(image =>response.render(__dirname + "/index2.html", {name:image}))
	//   .catch(collected => console.log(`Something went wrong ${collected.size} messages detected.`));
	// })




	// client.on("messageCreate", async (message) => {
	// 	if(message.author.id == '936929561302675456'&& message.content.startsWith(`**${a}`)&&message.attachments.size==1){
	// 	 console.log(message.attachments.first())
	// 	 console.log(`Message from ${message.author.username}: ${message.content}`)
	// 	 console.log('------')
	// 	 id = message.id
	// 	 image = message.attachments.first()?.url
	// 	//disabled for bobby
	// 	// channel.send(image)
	// 	 console.log(message.content)
		 
	// 	console.log('this ran first')
	// 	}});


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


app.post("/checkmessage", (request,response)=>{

	var long_pig = 'this is working'
	console.log(request.body)
	// console.log(request.)


	var targetmessage = request.body.message_id
	// const test_channel = '1103168663617556571'

	const test_channel = client.channels.cache.get('1103168663617556571');
	console.log(targetmessage)

	var button_column = request.body.col_
	var button_row = request.body.row_


	const message = test_channel.messages.fetch(request.body.message_id).then(message=>message.clickButton({ row: button_row, col: button_column})).then(render)

	console.log('does this code ever excute?')


	 
	});


// // let filter = m => m.author.id == '936929561302675456'&& m.content.startsWith(`**${a}`)&&m.attachments.size==1
// let filter = m => m.author.id == '1103519406493020181'


// console.log(client.channels.cache.get('1103168663617556571'))
// mychannel.send('hotdog')
// mychannel.awaitMessages(filter, {
// 	max: 1,
// 	time: 30000,
// 	errors: ['time']
// 	})
// 	.then(message => {
// 	message = message.first()
// 	// image = message.attachments.first()?.url
// 	console.log(`Message from ${message.author.username}: ${message.content}`)
// 	console.log('------')

	
// 	})
// var allGuilds = ''
// client.on("ready", function(){
//     allGuilds = client.channels;
// 	console.log(allGuilds)})
// console.log(allGuilds)


// client.on('ready', () => {
//     const chan = client.channels.cache.get("1103168663617556571");
//     // console.log(chan);
// 	const filter = m => m.content.startsWith('!wow');
// 	// chan.send('hotdog')
// 	chan.awaitMessages(filter, {
// 		max: 1,
// 		time: 30000,
// 		errors: ['time']
// 		})
// 		.then(message => {
		

	
// 	})



// });

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
// 	let a = '!vote'
// 	const channel = client.channels.cache.get("1103168663617556571");
// // const filter = m => m.content.startsWith(`**${a}`)&&m.attachments.size==1&&m.author.id =='108716440764358656'
// const filter = m => m.author.id =='108716440764358656'

// // Errors: ['time'] treats ending because of the time limit as an error
// channel.awaitMessages({ filter, max: 1, time: 60_000, errors: ['time'] })
//   .then(collected => image =  message_verify(collected))
// //   .then(image =>response.render(__dirname + "/index2.html", {name:image}))
// .then(image =>console.log(image))

//   .catch(collected => console.log(`Something went wrong ${collected.size} messages detected.`));
// })

	// const message = test_channel.messages.fetch(request.body.message_id).then(message=>console.log(message)).then(message => {
	// 	console.log(request.body.row_);
	// 	message.clickButton({ row: 1, col: 1});})
	// .then(response.render(__dirname + "/index2.html", {name:'hmm'}))
	
	

	// let a = request.body.userInput
	// console.log(a)
	// channel.sendSlash('936929561302675456','imagine', a)
	// // channel.send(a)
	// console.log(channel.lastMessageId)
	// console.log(channel.lastMessage)
	// var holder = "https://cdn.discordapp.com/attachments/1103168663617556571/1112219753755443220/lilhelper_yoda_being_flushed_down_a_toilet_3c563fb5-5c72-42c8-90a6-dd79f2698def.png"

	// response.render(__dirname + "/index2.html", {name:holder})

	// client.on("messageCreate", async (message) => {
	// 	// if (message.author.id == '936929561302675456'&& message.content.startsWith(`**${a}`)&&message.attachments.size==1){
	// 		if (message.author.id == '108716440764358656'){
	// 	//  console.log(message.attachments.first())
	// 	 console.log(`Message from ${message.author.username}: ${message.content}`)
	// 	 console.log('------')
	// 	 const mychannel = client.channels.cache.get('1103168663617556571');
	// 	 console.log(mychannel)

	// 	}})


	// 	 id = message.id
	// 	 image = message.attachments.first()?.url
	// 	//disabled for bobby
	// 	// channel.send(image)
	// 	 console.log(message.content)
	// 	//  response.render(__dirname + "/index2.html", {name:image})
	// 	setTimeout(direct, 5000);



	// 	}});

	// function direct(){
	// 	response.render(__dirname + "/index2.html", {name:image})
	// 	}




	// response.redirect(`/?lastMessageId=${channel.lastMessageId}`)
// })
