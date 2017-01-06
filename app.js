var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    stormpath = require('express-stormpath'),
    mongodb = require('mongodb');

var ObjectID = mongodb.ObjectID;

//app config
app.use(express.static("public"));
app.use(stormpath.init(app, {
  apiKeyFile: '/.stormpath/apiKey.properties',
  apiKeyId:     process.env.STORMPATH_API_KEY_ID,
  apiKeySecret: process.env.STORMPATH_API_KEY_SECRET,
  secretKey:    process.env.STORMPATH_SECRET_KEY,
  application:  process.env.STORMPATH_URL,
}));
app.set("view engin", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");// //mongoose/model config
// var crmSchema = mongoose.Schema({
//   cusName: String,
//   cusEmail: String,
//   cusNotes: String,
//   created: {type: Date, default: Date.now}
// });
//


// var Customer = mongoose.model("Customer", crmSchema);

//Rest Routes
app.get("/", function(req, res) {
  res.redirect('/login');
});

app.get("/userInfo", function(req, res) {
  res.send("This will be the custom data form, for users to enter thier info. Cant add customer until this iset.");
});

app.get("customers/newCustomer", function(req, res) {
  res.send("This will be the new customer form!");
});
//app launch
app.listen(process.env.PORT || 3000, function() {
  console.log("CRM Server is Running!");
})
