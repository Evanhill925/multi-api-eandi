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
app.set('view engine', 'ejs')
app.use(express.static('public'))
const mongoose = require('mongoose');
const { url } = require('node:inspector');
db = main().catch(err => console.log(err));

async function dbItems() {
const pulledFromDb = await Entry.find();
	let heldItems = pulledFromDb.slice(-6).reverse()
	return heldItems
}



async function main() {
	dbName = 'Midjourney'
  await mongoose.connect(process.env.DB_STRING);
  console.log(`Connected to ${dbName} Database`);
}


const midSchema = new mongoose.Schema({
	username: {type:String},
	prompt: {type:String},
	image_url:{type:String},
	image_message_id:{type:String},
	type:{type:String},
	origin_id:{type:String},
	time:{type:String},
	quadrant:{type:String}
  });
const Entry = mongoose.model('userInstruction', midSchema);




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



// app.engine('html', require('ejs').renderFile);


const client = new Client({
	// See other options here
	// https://discordjs-self-v13.netlify.app/#/docs/docs/main/typedef/ClientOptions
	// All partials are loaded automatically
	checkUpdate: false,
});

client.login(process.env.token);



app.get('/',async(request,response)=>{
	let storedDBItems = await dbItems()
	console.log(storedDBItems)
	const default_image = await Entry.findOne({ image_message_id: '1121497222287200366' }).exec();
	var params = { username: "someuser",
		 				image_url:default_image.image_url,
		  				image_message_id: default_image.image_message_id,
		   				prompt:default_image.prompt,
						type:default_image.type,
						items:storedDBItems
						
					}
	default_url = default_image.image_url
	response.render("index.ejs", params)
})

app.get('/gallery',async(request,response)=>{
	const pulledFromDb = await Entry.find();
	let fiftyHeldItems = pulledFromDb.slice(-51).reverse()
	response.render("gallery.ejs", {items:fiftyHeldItems})
})

app.post('/image',async(request,response)=>{
	let storedDBItems = await dbItems()
	const primary_image = await Entry.findOne({ image_message_id: request.body.message_id }).exec();
	console.log(primary_image)
	var params = { username: "someuser",
		 				image_url:primary_image.image_url,
		  				image_message_id: primary_image.image_message_id,
						  prompt:primary_image.prompt,
						  type:primary_image.type,
						  items:storedDBItems
						
					}
	console.log(params)
	console.log('-----')
	response.render("index.ejs", params)
})


app.listen(PORT,()=>{
    console.log(`This server is running on port ${PORT}`)
})

app.post("/addPrompt",async (request,response)=>{
	// response.render("index.ejs", {image_url:"https://media.discordapp.net/attachments/1103168663617556571/1116864121149849690/lilhelper_fox_man_hunted_webcam_99eba765-c8f8-4270-aee4-0f1dc0519c5e.png?width=559&height=559"})
	// console.log(adasdasdasd)()
	console.log(request.body)
	let a = request.body.userInput.trim() + request.body.model
	const channel = client.channels.cache.get('1103168663617556571');
	channel.sendSlash('936929561302675456','imagine', a)
	channel.send(a)
	let storedDBItems = await dbItems()
	// const filter = m => m.content.startsWith('!vote');
	const filter = m => m.content.startsWith(`**${a}`)&&m.attachments.size==1&&m.author.id =='936929561302675456'
// Errors: ['time'] treats ending because of the time limit as an error
 var result = channel.awaitMessages({ filter, max: 1, time: 120_000, errors: ['time'] })
//   .then(collected=> response.render(__dirname + "/index.ejs", {name:collected.first().attachments.first().url,message_id: collected.first().id}))
	.then(collected=>{
		var params = { username: "someuser",
		 				image_url:collected.first().attachments.first().url,
		  				image_message_id: collected.first().id,
		   				prompt:a,
						type:'Original',
						time:collected.first().createdTimestamp,
						items:storedDBItems
					}

		console.log(params)
		Prompt = new Entry(params)
		Prompt.save()
		response.render("index.ejs", params)
		})
  .catch(collected =>{ console.log(`After a minute, only ${collected.size} ${collected} out of 4 voted.`)
						response.redirect('/')																				});
})
	

	// response.redirect(`/?lastMessageId=${channel.lastMessageId}`))})


app.post("/checkmessage", async (request,response)=>{

	console.log('here')
	console.log(request.body)
	// console.log(request)
	var targetmessage = request.body.message_id
	// const test_channel = '1103168663617556571'

	const channel = client.channels.cache.get('1103168663617556571');
	console.log(targetmessage)
	const message = await channel.messages.fetch(request.body.message_id)



	function determine_type(row,column) {
		if (column ==='4'){
			return 'Reimagine'
		}
		if (row === '0') {
		  return 'Upscale';
		} else if (row === '1') {
		  return 'Variation';
		} else {
		  return null;
		}
	  }

	  let storedDBItems = await dbItems()



	  async function  find_premades(row,column,search_type){
		const existing_image = await Entry.findOne({ origin_id: request.body.message_id,quadrant:column, type: search_type}).exec();
		// const existing_image = await Entry.findOne({ origin_id: request.body.message_id}).exec();
		console.log(request.body.message_id,request.body.columns_,determine_type(request.body.row_,request.body.columns_))
		return existing_image
		}



	  const  premade_image = await find_premades(request.body.row_,request.body.columns_,determine_type(request.body.row_,request.body.columns_))
	  
	  if (premade_image!=null){
		console.log('variant already in database.')
		premade_image.items = storedDBItems
		response.render("index.ejs", premade_image)

	  }
	  else{
	  

	// .then(message=>message.clickButton({ row: button_row, col: button_column}));
	message.clickButton({ row:request.body.row_, col: request.body.columns_})
	const filter = m => m.attachments.size==1&&m.author.id =='936929561302675456'&&m.reference.messageId == request.body.message_id

	var result = channel.awaitMessages({ filter, max: 1, time: 120_000, errors: ['time'] })
	//   .then(collected=> response.render(__dirname + "/index.ejs", {name:collected.first().attachments.first().url,message_id: collected.first().id}))
		.then(collected=>{
			var params = { username: "someuser",
							 image_url:collected.first().attachments.first().url,
							  image_message_id: collected.first().id,
							  origin_id:request.body.message_id,
							  type:determine_type(request.body.row_,request.body.columns_),
							  time:collected.first().createdTimestamp,
							  prompt:"",
							  quadrant:request.body.columns_,
							  items:storedDBItems
							   }
	
			console.log(params)
	
	
			Prompt = new Entry(params)
			Prompt.save()
			response.render("index.ejs", params)
		})
	  .catch(collected => console.log(`After a minute, only ${collected.size} ${collected} out of 4 voted.`));
	}
	 });
	

