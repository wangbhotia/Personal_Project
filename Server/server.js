const express = require('express'),
			bodyParser = require('body-parser'),
			cors = require('cors'),
			massive = require('massive'),
			config = require('./config.js'),
			session = require('express-session'),
			passport = require('passport'),
			Auth0Strategy = require('passport-auth0');

const port = 3000;
const app = module.exports = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: config.secret
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + './../public'));

const conn = massive.connectSync({
	connectionString: config.elephant
});

app.set('db', conn);
const db = app.get('db');

const serverCtrl = require('./serverCtrl');
const awsCtrl = require('./awsCtrl');
// const authCtrl = require('./authCtrl'); // <-- TO DO


passport.use(new Auth0Strategy({
	domain:       config.auth0.domain,
	clientID:     config.auth0.clientID,
	clientSecret: config.auth0.clientSecret,
	callbackURL:  '/auth/callback'
},
  function(accessToken, refreshToken, extraParams, profile, done){
    //Find user in database
    // console.log(profile)
    db.get_user([profile.id], function(err, user){
      user = user[0];
      if (!user) { //if there isn't one, we'll create one!
        // console.log('CREATING USER');
        db.create_user([profile.name.givenName, profile.name.familyName, profile._json.email, profile.id], function(err, user) {
          // console.log('USER CREATED', user);
          return done(err, user[0]);
        })
      } else {
        // console.log('FOUND USER', user);
        return done(err, user);
      }
    })
  }
));


passport.serializeUser(function(userA, done) {
  // console.log('serializing', userA);
  var userB = userA;
  done(null, userB); //PUTS 'USER' ON THE SESSION
});

passport.deserializeUser(function(userB, done) {
  var userC = userB;
  // console.log('userC: ', userC);
  done(null, userC); //PUTS 'USER' ON REQ.USER
});


app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback',
  passport.authenticate('auth0', {successRedirect: '/'}), function(req, res) {
    res.status(200).send(req.user);
});

app.get('/auth/me', function(req, res) {
  if (!req.user) return res.sendStatus(404);
  //THIS IS WHATEVER VALUE WE GOT FROM userC variable above.
  res.status(200).send(req.user);
});

app.get('/auth/logout', function(req, res) {
  req.logout();
  // console.log('Logout Success');
  res.redirect('/');
});


app.get('/businesses', serverCtrl.getAllBus);

app.get('/special/:id', serverCtrl.getSpecial);

app.get('/menu/:id', serverCtrl.getMenu);

app.get('/menuitems/:id', serverCtrl.getMenuItems);

app.get('/gallery/:id', serverCtrl.getGallery);

app.post('/createbus', serverCtrl.newBus);

app.post('/newimage', awsCtrl.saveImage);

app.put('/featbus', serverCtrl.featureBus);

app.put('/updatebus', serverCtrl.updateBus, serverCtrl.updateAddress, serverCtrl.updateHours, serverCtrl.updateSocial);

app.delete('/deletebus/:id', serverCtrl.deleteBus);


app.listen(port, () => {
	console.log('App is running on port:', port);
});

