const express = require('express'),
		bodyParser = require('body-parser'),
		cors = require('cors'),
		massive = require('massive');

const port = 3000;
const app = module.exports = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + './../public'));

const conn = massive.connectSync({
	connectionString: 'postgres://postgres:dm21-wb@localhost/merofood'
});

app.set('db', conn);
const db = app.get('db');
const serverCtrl = require('./serverCtrl');

app.get('/businesses', function(req, res){
	db.get_all_bus(function(err, businesses){
		if(!err){
			// console.log(businesses);
			res.send(businesses);
		} else {
			// console.log(err)
			res.send(err);
		}
	});
});

app.get('/special/:id', function(req, res){
	let sId = parseInt(req.params.id);
	db.get_special(sId, function(err, special){
		if(!err){
			res.send(special);
		} else {
			res.send(err)
		}
	});
});

app.get('/menu/:id', function(req, res){
	let mId = parseInt(req.params.id);
	db.get_menu(mId, function(err, menu){
		if(!err){
			res.send(menu);
		} else {
			res.send(err)
		}
	});
});

app.get('/menuitems/:id', function(req, res){
	let miId = parseInt(req.params.id);
	db.get_menu_items(miId, function(err, menuitems){
		if(!err){
			res.send(menuitems);
		} else {
			res.send(err)
		}
	});
});

app.get('/gallery/:id', function(req, res){
	let gId = parseInt(req.params.id);
	db.get_gallery(gId, function(err, gallery){
		if(!err){
			res.send(gallery);
		} else {
			res.send(err)
		}
	});
});

app.post('/createbus', serverCtrl.newBus);



app.listen(port, function(){
	console.log('App is running on port:', port);
});

