// const app = require('./server'),
//       db = app.get('db'),
//       config = require('./config.js');
// 			session = require('express-session'),
// 			passport = require('passport'),
// 			Auth0Strategy = require('passport-auth0');

app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: config.secret
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
	domain:       config.auth0.domain,
	clientID:     config.auth0.clientID,
	clientSecret: config.auth0.clientSecret,
	callbackURL:  '/auth/callback'
},
  function(accessToken, refreshToken, extraParams, profile, done){
    //Find user in database
    db.get_user([profile.id], function(err, user){
      user = user[0];
      if (!user) { //if there isn't one, we'll create one!
        console.log('CREATING USER');
        db.create_user([profile.displayName, profile.id], function(err, user) {
          console.log('USER CREATED', userA);
          return done(err, user[0]); // GOES TO SERIALIZE USER
        })
      } else { //when we find the user, return it
        console.log('FOUND USER', user);
        return done(err, user);
      }
    })
  }
));

//THIS IS INVOKED ONE TIME TO SET THINGS UP
passport.serializeUser(function(userA, done) {
  console.log('serializing', userA);
  var userB = userA;
  //Things you might do here :
   //Serialize just the id, get other information to add to session, 
  done(null, userB); //PUTS 'USER' ON THE SESSION
});

//USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
passport.deserializeUser(function(userB, done) {
  var userC = userC;
  //Things you might do here :
    // Query the database with the user id, get other information to put on req.user
  done(null, userC); //PUTS 'USER' ON REQ.USER
});




// module.exports = {
//   newUser: function(req, res) {
    
//     });
//   }
// }