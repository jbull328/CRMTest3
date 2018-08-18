var express = require("express"),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Organization = require("../models/organization"),
    Customer = require("../models/customer"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");


router.use(function(req, res, next) {
  next();
});
router.post('/newCustomer', function(req, res) {
  var cusFirstName = req.body.cusFirstName;
  var cusLastName = req.body.cusLastName;
  var cusAddress = req.body.cusAddress;
  var cusEmail = req.body.cusEmail;
  var orgId = req.user.customData.userOrg;
  var newCustomer = {cusFirstName: cusFirstName, cusLastName: cusLastName, cusAddress: cusAddress, cusEmail: cusEmail, orgId: orgId,}
  Customer.create(newCustomer, function(err, newlyCreatedCust) {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/customerIndex/" + orgId);
    }
  });
});

module.exports = router;
