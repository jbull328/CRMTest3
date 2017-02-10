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
router.get("/customerIndex/:id",stormpath.loginRequired, function(req, res) {
    Organization.findById(req.params.orgId, function(err, foundOrganization) {
        if(err) {
            res.redirect("/");
        } else {
            Customer.find({}, function(err, allCustomers) {
              if (err) {
                  console.log(err);
              } else {
                  console.log(allCustomers);
                  res.render("customerIndex.ejs", {organization: foundOrganization, customers: allCustomers});
              }
            });
        }
    });
});

module.exports = router;
