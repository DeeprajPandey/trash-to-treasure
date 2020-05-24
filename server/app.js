const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const crypto = require("crypto"); // for gravatar
const axios = require("axios");
const helmet = require("helmet");
const history = require('connect-history-api-fallback');
const queryString = require('query-string');
const logger = require("morgan");

const config = require("./config");
const port = normalizePort(process.env.PORT || config.port);
const staticRoot = "./dist/spa";
const saltRounds = config.salt_rounds;

// Databse setup (MongoDB Atlas)
const mongoose = require('mongoose');
const db = require("./db");
const User = db.User;
const dbName = "data";
const collectionName = "users";
mongoose.connect(config.db.connection_url, {dbName: "data", useNewUrlParser: true });

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(helmet());
app.use(express.static(staticRoot)); // For production
// Sessions
const options = { secret: config.cookie.secret, saveUninitialized: true, resave: true };
app.use(session(options));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log('serialize');
  console.log(user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log('deserialize');
  done(null, user);
});

// setup passport callback verification for register and login
// authentication middlewares
passport.use('register-strategy', new localStrategy(
  { usernameField: 'email', passwordField: 'phash', passReqToCallback: true },
  (req, email, phash, done) => {
  let userInp = req.body;
  console.log(`in callback ${userInp}`);
  let email_id = userInp.email;
  let name = userInp.name;

  let userExists = checkUserExists(email_id);

  if(userExists) {
    console.info(`User exists: ${email_id}`);
    done(null, false, {reason: 'exists'});
  } else {
    // create email hash and request picture url
    let hash = crypto.createHash('md5').update(email_id.toLowerCase().trim()).digest("hex");
    userInp.imgurl = `https://www.gravatar.com/avatar/${hash}?d=retro`;
    console.log(`BEFORE DATABASE ${userInp}`);
    // receive user obj without phash and _id
    let user = registerUser(userInp);
    console.info(`Added new user: ${name}, ${email_id}`);
    done(null, user);
  }
}
));

// auth routes
app.post('/register', (req, res, next) => {
  passport.authenticate('register-strategy', (err, userObj, info) => {
    if(err) {
      return next(err);
    }

    if(!userObj) { // when user has already registered
      // redirect with query param "exists" and ask to log in
      res.status(400);
      res.redirect(`/?r=${info.reason}`);
    }

    req.logIn(userObj, function(err) {
      if(err) {
        return next(err);
      }
      console.log('inside req.login');

      // on successful login (after register)
      // redirect to /app?u=email so frontend can request for other info
      let urlParams = {
        u: userObj.email
      };
      let stringifiedParams = queryString.stringify(urlParams);
      return res.redirect(`/app?${stringifiedParams}`);
    });
  })(req, res, next);
});

// For Production
app.use(history({
  index: '/'
}));
app.get("/", (req, res, next) => {
    res.sendFile("index.html", { root: staticRoot });
});

// Database Routes
// Add a new user [CREATE]
app.post("/users", async (request, response) => {
  const newUser = new User(request.body);

  try {
    await newUser.save();
    response.send(newUser);
  } catch (err) {
    response.status(500).send(err);
  }
});

// Read all users [READ ALL]
  app.get("/users", async (request, response) => {
    const allUsers = await User.find({}, '_id name points');

    try {
      response.json(allUsers);
    } catch (err) {
      response.status(500).send(err);
    }
  });

// Read a single user data [READ ONE]
app.get("/users/:email", async (request, response) => {
  const userEmail = request.params.email;
  const usr = await User.findOne({ email: userEmail });

  try {
    response.json(usr);
  } catch (err) {
    response.status(500).send(err);
  }
});

// Update a user data [UPDATE]
app.put("/users/:email", (request, response) => {
  const userEmail = request.params.email;
  const user = request.body;
  console.log("Editing user: ", userEmail, " to be ", user);

  const res = User.updateOne({ email: userEmail }, { $set: user });
  // no of docs matched
  if(res.n > 0) {
    try {
      response.json({"msg": "success"});
    } catch (err) {
      response.status(500).send(err);
    }
  }
});

// db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
  
//   // auth helpers
//   function checkUserExists(email_id) {
//     return dbCollection.countDocuments({ email: email_id }, { limit: 1 }) > 0;
//   }

//   function registerUser(user) {
//     // password is still plaintext, change it
//     bcrypt.hash(user.plaintext, saltRounds, function(err, hash) {
//       // add the password hash and remove plaintext
//       user.phash = hash;
//       delete user.plaintext;
//       // initialise points field
//       user.points = 0;

//       // add new user to database
//       dbCollection.insertOne(user, (error, result) => { // callback of insertOne
//         if (error) throw error;
//       });

//       // have to return new user data after registering
//       dbCollection.findOne({ email: userEmail }, { _id: 0, phash: 0 }, (error, result) => {
//         if (error) throw error;
//         return result;
//       });
//     });
//   }

//   // get all items
//   dbCollection.find().toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//   });

//   // Add a new user [CREATE]
//   app.post("/users", (request, response) => {
//     const newUser = request.body;
//     dbCollection.insertOne(newUser, (error, result) => { // callback of insertOne
//       if (error) throw error;
//       // return updated list
//       dbCollection.find().toArray((_error, _result) => { // callback of find
//         if (_error) throw _error;
//         response.json(_result);
//       });
//     });
//   });

//   // Read all users [READ ALL]
//   app.get("/users", (request, response) => {
//     // return updated list
//     dbCollection.find({}, {email: 0, phash: 0}).toArray((error, result) => {
//       if (error) throw error;
//       response.json(result);
//     });
//   });

//   // Read a single user data [READ ONE]
//   app.get("/users/:email", (request, response) => {
//     const userEmail = request.params.email;

//     dbCollection.findOne({ email: userEmail }, (error, result) => {
//       if (error) throw error;
//       // return user
//       response.json(result);
//     });
//   });

  // // Update a user data [UPDATE]
  // app.put("/users/:email", (request, response) => {
  //   const userEmail = request.params.email;
  //   const user = request.body;
  //   console.log("Editing user: ", userEmail, " to be ", user);

  //   dbCollection.updateOne({ email: userEmail }, { $set: user }, (error, result) => {
  //     if (error) throw error;
  //     // send back entire updated list, to make sure frontend data is up-to-date
  //     dbCollection.find().toArray(function(_error, _result) {
  //       if (_error) throw _error;
  //       response.json(_result);
  //     });
  //   });
  // });

// }, function(err) { // failureCallback
//     throw (err);
// });

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