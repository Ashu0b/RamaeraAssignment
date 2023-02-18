const express = require ("express")
const app = express()
const mongoose = require ("mongoose")
const bodyParser = require ("body-parser")
const urlencoded = require("body-parser/lib/types/urlencoded")
const route = require("./route/route.js")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://As_357:e7tF08joaS2NR5h1@cluster0.k4tlh.mongodb.net/test",{
    useNewUrlParser:true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/',route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});