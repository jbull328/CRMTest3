var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    stormpath = require('express-stormpath');

//app config
mongoose.connect("mongodb:localhost/crm_dev");

app.set("view engin", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//mongoose/model config
var crmSchema = mongoose.Schema({
  cusName: String,
  cusEmail: String,
  cusNotes: String,
  created: {type: Date, default: Date.now}
});

var Customer = mongoose.model("Customer", crmSchema);

//Rest Routes

//app launch
app.listen(process.env || 3000, function() {
  console.log("CRM Server is Running!");
})
