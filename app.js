var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Organization = require("./public/models/organization"),
    Customer = require("./public/models/customer"),
    stormpath = require('express-stormpath'),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");


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


//Rest Routes
app.get("/", function(req, res) {
  res.render("landing");
});

//This is the customer Index route that shows a list of customerSchema
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


app.get("/userNew",stormpath.loginRequired, stormpath.getUser, function(req, res) {
  var orgId = req.user.customData.userOrg;
  if (req.user.customData.userOrg != null) {
    res.redirect("/customerIndex/" + orgId);
  } else {
    res.render("userNew");
  }

});

app.get("/customer/:id", stormpath.loginRequired, function(req, res) {
  Customer.findById(req.params.id, function(err, customerRef) {
    if (err) {
      console.log(err);
    } else {
      console.log(customerRef);
      res.render("customer", {customer: customerRef});
    }
  });

});

app.get('/customers/new', stormpath.loginRequired, function(req, res) {
  res.render("newCustomer");
});


app.post('/userNew', stormpath.loginRequired, function(req, res) {
  var orgIdSimple = req.body.orgName;
  var orgIdSimple = orgIdSimple.replace(/\s/g, '');
  req.user.customData.userOrg = orgIdSimple;
  req.user.customData.save(function(err) {
    if (err) {
      console.log(err);  // this will throw an error if something breaks when you try to save your changes
    } else {
    }
  });
  var userEmail = req.user.email;
  var orgId = req.body.orgName;
  var givenName = req.body.givenName;
  var surname = req.body.surname;
  var newOrganization = {orgId: orgId, givenName: givenName, surname: surname, userEmail: userEmail,};
  //create a new campground and save to DB
  Organization.create(newOrganization, function(err, newlyCreated) {
   if(err) {
       console.log(err);
   } else {
      res.redirect("/customerIndex/" + orgIdSimple);
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
      res.redirect("/customerIndex/" + orgId);
    }
  });
});

app.put('/customer/:id', stormpath.loginRequired, stormpath.getUser, function(req, res) {
  // req.body.customer.body = req.sanitize(req.customer.customer.body);
  var orgId = req.user.customData.userOrg;
  Customer.findByIdAndUpdate(req.params.id, req.body.customer, function(err, updatedCustomer) {
    if (err) {
      console.log(err);
      res.redirect("customerIndex/" + orgId)
    } else {
      res.redirect("/customerIndex/" + orgId);
    }
  });
});

//app launch
app.listen(process.env.PORT || 3000, function() {
  console.log("CRM Server is Running!");
})
