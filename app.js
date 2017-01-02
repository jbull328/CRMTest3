var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    stormpath = require('express-stormpath');

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

// //mongoose/model config
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
  res.send("PLease <a href='/login'>login</a>");
});
//app launch
app.listen(process.env.PORT || 3000, function() {
  console.log("CRM Server is Running!");
})
