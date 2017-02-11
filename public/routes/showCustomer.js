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

router.get("/customer/:id", stormpath.loginRequired, function(req, res) {
  Customer.findById(req.params.id, function(err, customerRef) {
    if (err) {
      console.log(err);
    } else {
      console.log(customerRef);
      res.render("customer.ejs", {customer: customerRef});
    }
  });

});

router.get('/customers/new', stormpath.loginRequired, function(req, res) {
  res.render("newCustomer.ejs");
});

module.exports = router;
