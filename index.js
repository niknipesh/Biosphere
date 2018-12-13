let express = require('express')
let apiRoutes = require("./api-routes")
var appController = require('./appController')
var contactController = require('./contactController');
let bodyParser = require('body-parser')
let mongoose = require('mongoose')

let app = express()
let port = process.env.PORT || 8080

//Connection to Mongo
mongoose.connect('mongodb://localhost/BIOSPHERE');
var db = mongoose.connection;


app.use(bodyParser.urlencoded({
    extended: true
 }));
app.use(bodyParser.json());


app.use('/api', apiRoutes)


app.get('/', (req, res) => res.send('Hello World with Express'));
app.listen(port, function () {
    console.log("Running Biosphere on port " + port);
});
