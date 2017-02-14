var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Organization = require("./public/models/organization"),
    Customer = require("./public/models/customer"),
    stormpath = require('express-stormpath'),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    router = express.Router(),
    showLandingRoute = require('./public/routes/showLanding.js'),
    showNewOrganizationRoute = require('./public/routes/showNewOrganization.js'),
    showCustomerIndexRoute = require('./public/routes/showCustomerIndex.js'),
    showCustomer = require('./public/routes/showCustomer.js'),
    createNewOrganizationRoute = require('./public/routes/createNewOrganization.js'),
    createNewCustomerRoute = require('./public/routes/createNewCustomer.js'),
    editCustomerRoute = require('./public/routes/editCustomer.js'),
    showEmailForm = require('./public/routes/showEmailForm.js');


//app config
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(stormpath.init(app, {
  apiKeyFile: '/.stormpath/apiKey.properties',
  apiKeyId:     process.env.STORMPATH_API_KEY_ID || 'key',
  apiKeySecret: process.env.STORMPATH_API_KEY_SECRET || 'secret',
  secretKey:    process.env.STORMPATH_SECRET_KEY || 'key',
  application:  process.env.STORMPATH_URL || 'url',
  expand: {
    customData: true,
  }
}));

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
var mongodbUri = "mongodb://heroku_2vbj6xl4:713tteam22ns19hkqj90ioeeuc@ds151048.mlab.com:51048/heroku_2vbj6xl4";
mongoose.connect(mongodbUri);
var db = mongoose.connection;

///////////////////////////////Router Calls//////////////////////////////////////////////////////

app.get('/customerIndex/:id', showCustomerIndexRoute);
app.get('/userNew', showNewOrganizationRoute);
app.get('/customer/:id', showCustomer);
app.get('/customers/new', showCustomer);
app.get("/", showLandingRoute);
app.get("/emailForm", showEmailForm);

app.post("/userNew", createNewOrganizationRoute);
app.post("/newCustomer", createNewCustomerRoute);

app.put('/customer/:id', editCustomerRoute);
app.delete("/customer/:id", editCustomerRoute);


//app launch
app.listen(process.env.PORT || 3000, function() {
  console.log("CRM Server is Running!");
})
