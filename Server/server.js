let express = require('express'),
		bodyParser = require('body-parser'),
		cors = require('cors'),
		massive = require('massive');

const port = 3000;
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + './../public'));

let conn = massive.connectSync({
	connectionString: 'postgres://postgres:dm21-wb@localhost/merofood'
});

app.set('db', conn);
let db = app.get('db');

app.get('/businesses', function(req, res) {
	db.get_all_bus(function(err, businesses) {
		if(!err){
			// console.log(businesses);
			res.send(businesses);
		} else {
			// console.log(err)
			res.send(err);
		}
	});
});



app.listen(port, function(){
	console.log('App is running on port:', port);
});

