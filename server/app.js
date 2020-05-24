const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const ession = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const crypto = require("crypto"); // for gravatar
const axios = require("axios");
const helmet = require("helmet");
const history = require('connect-history-api-fallback');
const logger = require("morgan");

const config = require("./config");
const port = normalizePort(process.env.PORT || config.port);
const staticRoot = "./dist/spa";
const saltRounds = config.salt_rounds;

// Databse setup (MongoDB Atlas)
const db = require("./db");
const dbName = "data";
const collectionName = "users";

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(helmet());
// Sessions
const options = { secret: config.cookie.secret, saveUninitialized: true, resave: true };
app.use(session(options));
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// passport serialize and de-serialize methods
passport.serializeUser((userInfo, done) => {
  done(null, userInfo);
});

passport.deserializeUser((userInfo, done) => {
  done(null, userInfo);
});

// setup passport callback verification for register and login
const verifyRegisterCallback = (user, done) => {
  let email_id = user.email;
  let name = user.name;

  let userExists = checkUserExists(email_id);

  if(userExists) {
    console.info(`User exists: ${email_id}`);
    done(null, false, {reason: 'exists'});
  } else {
    // create email hash and request picture url
    let hash = crypto.createHash('md5').update(email_id.toLowerCase().trim()).digest("hex");
    user.imgurl = `https://www.gravatar.com/avatar/${hash}?d=retro`;

    // receive user obj without phash and _id
    let userObj = registerUser(user);
    console.info(`Added new user: ${name}, ${email_id}`);
    done(null, userObj);
  }
};

// authentication middlewares
passport.use('register', new localStrategy(
  { passReqToCallback: true },
  verifyRegisterCallback
));

// auth routes
app.post('/register', (req, res, next) => {
  passport.authenticate(register, (err, userObj, info) => {
    if(err) {
      return next(err);
    }
    if(!userObj) { // when user exists
      // redirect with query param "exists" and ask to log in
      res.status(400);
      res.redirect(`/?r=${info.reason}`);
    }
  })(req, res, next);
});

// For production
// app.use(express.static(staticRoot));
// app.use(history({
//   index: '/'
// }));
// app.get("/", (req, res, next) => {
//     res.sendFile("index.html", { root: staticRoot });
// });

// 

db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
  
  // auth helpers
  function checkUserExists(email_id) {
    return dbCollection.countDocuments({ email: email_id }, { limit: 1 }) > 0;
  }

  function registerUser(user) {
    // password is still plaintext, change it
    bcrypt.hash(user.plaintext, saltRounds, function(err, hash) {
      // add the password hash and remove plaintext
      user.phash = hash;
      delete user.plaintext;
      // initialise points field
      user.points = 0;

      // add new user to database
      dbCollection.insertOne(user, (error, result) => { // callback of insertOne
        if (error) throw error;
      });

      // have to return new user data after registering
      dbCollection.findOne({ email: userEmail }, { _id: 0, phash: 0 }, (error, result) => {
        if (error) throw error;
        return result;
      });
    });
  }

  // get all items
  dbCollection.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });

  // Add a new user [CREATE]
  app.post("/users", (request, response) => {
    const newUser = request.body;
    dbCollection.insertOne(newUser, (error, result) => { // callback of insertOne
      if (error) throw error;
      // return updated list
      dbCollection.find().toArray((_error, _result) => { // callback of find
        if (_error) throw _error;
        response.json(_result);
      });
    });
  });

  // Read all users [READ ALL]
  app.get("/users", (request, response) => {
    // return updated list
    dbCollection.find({}, {email: 0, phash: 0}).toArray((error, result) => {
      if (error) throw error;
      response.json(result);
    });
  });

  // Read a single user data [READ ONE]
  app.get("/users/:email", (request, response) => {
    const userEmail = request.params.email;

    dbCollection.findOne({ email: userEmail }, (error, result) => {
      if (error) throw error;
      // return user
      response.json(result);
    });
  });

  // Update a user data [UPDATE]
  app.put("/users/:email", (request, response) => {
    const userEmail = request.params.email;
    const user = request.body;
    console.log("Editing user: ", userEmail, " to be ", user);

    dbCollection.updateOne({ email: userEmail }, { $set: user }, (error, result) => {
      if (error) throw error;
      // send back entire updated list, to make sure frontend data is up-to-date
      dbCollection.find().toArray(function(_error, _result) {
        if (_error) throw _error;
        response.json(_result);
      });
    });
  });

}, function(err) { // failureCallback
    throw (err);
});

app.listen(port, "0.0.0.0");
console.info(`Listening on ${port}...`);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}