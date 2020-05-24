const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require("express-session");
const history = require('connect-history-api-fallback');
const logger = require("morgan");

const config = require("./config");
const port = normalizePort(process.env.PORT || config.port);
const staticRoot = "../frontend/dist/spa";

// Databse setup (MongoDB Atlas)
const db = require("./db");
const dbName = "data";
const collectionName = "users";

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sessions
const options = { secret: config.cookie.secret, saveUninitialized: true, resave: true };
app.use(session(options));
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

// For production
// app.use(express.static(staticRoot));
// app.use(history({
//   index: '/'
// }));
// app.get("/", (req, res, next) => {
//     res.sendFile("index.html", { root: staticRoot });
// });

db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
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
    dbCollection.find().project({email: 0, phash: 0}).toArray((error, result) => {
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