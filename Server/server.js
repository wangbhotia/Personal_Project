let express = require('express'),
		bodyParser = require('body-parser'),
		cors = require('cors'),
		massive = require('massive');

var seed = require('../seed_data.json');
// console.log(seed);

const port = 3000;
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + './../public'));


app.get('/', function(req, res){
	res.status(200).send(seed);
});



app.listen(port, function(){
	console.log('App is running on port:', port);
});

