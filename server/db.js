const MongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose');

const config = require("./config");
const dbConnectionUrl = config.db.connection_url;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  points: {
    type: Number,
    default: 0
  },
  phash: {
    type: String
  },
  imgurl: {
    type: String
  }
}, { collection: 'users'});

const User = mongoose.model("User", UserSchema);

function initialize(
    dbName,
    dbCollectionName,
    successCallback,
    failureCallback
) {
    MongoClient.connect(dbConnectionUrl, function(err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err); // this should be "caught" by the calling function
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            console.log("[MongoDB connection] SUCCESS");

            successCallback(dbCollection);
        }
    });
}

module.exports = {
    initialize,
    User
};