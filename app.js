var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    stormpath = require('express-stormpath');


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
}));



app.use(bodyParser.urlencoded({extended: true}));

var mongodbUri = "mongodb://heroku_2vbj6xl4:713tteam22ns19hkqj90ioeeuc@ds151048.mlab.com:51048/heroku_2vbj6xl4";

mongoose.connect(mongodbUri);

var db = mongoose.connection;
var organizationSchema = new mongoose.Schema({
  orgName : String,
  orgId : String,
  givenName : String,
  surname : String,
});
var Organization = mongoose.model("Organization", organizationSchema);
//customer Schema
var customerSchema = new mongoose.Schema({
  cusFirstName : String,
  cusLastName : String,
  cusAddress : String,
  cusEmail : String,
});
var Customer = mongoose.model("Customer", customerSchema);
//Rest Routes
app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/customerIndex/:id",stormpath.loginRequired, function(req, res) {
    Organization.findById(req.params.orgId, function(err, foundOrganization) {
        if(err) {
            res.redirect("/");
        } else {
            Customer.find({}, function(err, allCustomers) {
              if (err) {
                  console.log(err);
              } else {
                  console.log(allCustomers);
                  res.render("customerIndex", {organization: foundOrganization, customers: allCustomers});
              }
            });
        }
    });

});

app.get("/userNew",stormpath.loginRequired, function(req, res) {
  res.render("userNew")
});

app.get('/customers/new', stormpath.loginRequired, function(req, res) {
  res.render("newCustomer");
});

app.post('/userNew', stormpath.loginRequired, function(req, res) {
  var orgName = req.body.orgName;
  // TODO user regex to remove spaces and capitals from orgId
  var orgId = req.body.orgName;
  var givenName = req.body.givenName;
  var surname = req.body.surname;
  var newOrganization = {orgName: orgName, orgId: orgId, givenName: givenName, surname: surname,};
  //create a new campground and save to DB
  Organization.create(newOrganization, function(err, newlyCreated) {
   if(err) {
       console.log(err);
   } else {
      res.redirect("/customerIndex/" + orgId);
   }
 });
});

app.post('/newCustomer', stormpath.loginRequired, function(req, res) {
  var cusFirstName = req.body.cusFirstName;
  var cusLastName = req.body.cusLastName;
  var cusAddress = req.body.cusAddress;
  var cusEmail = req.body.cusEmail;
  var orgId = Organization.findById(req.params.orgId, function(err, foundOrgId) {
    if(err) {
      console.log(err);
    } else {
    orgId = {orgId: foundOrgId};
    }
  });
  var newCustomer = {cusFirstName: cusFirstName, cusLastName: cusLastName, cusAddress: cusAddress, cusEmail: cusEmail,}
  Customer.create(newCustomer, function(err, newlyCreatedCust) {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/customerIndex/", {organization: orgId});
    }
  });
});

//app launch
app.listen(process.env.PORT || 3000, function() {
  console.log("CRM Server is Running!");
})
