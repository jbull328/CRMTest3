var express = require("express"),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Organization = require("../models/organization"),
    Customer = require("../models/customer"),
    stormpath = require('express-stormpath'),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");


router.use(function(req, res, next) {
  next();
});

router.post('/userNew', stormpath.loginRequired, function(req, res) {
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


module.exports = router;
