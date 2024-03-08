const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoute.js')
let app = express()
app.use(express.json())
app.use('/', userRoute)
mongoose.connect('mongodb+srv://j_jivan:223521@cluster0.tbpicad.mongodb.net/group27Database')
.then(() => console.log("MongoDb is connected"))
.catch((err) => console.log(err))

app.listen(3000, function(){
    console.log('this app is running on port 3000')
})