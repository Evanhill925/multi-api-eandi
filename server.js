const { Console } = require("console")

const express = require("express")
const app = express()
const PORT = 8000

app.get('/',(request,response)=>{
    response.sendFile(__dirname + "/index.html")
})

app.listen(PORT,()=>{
    console.log(`This server is running on port ${PORT}`)
})
