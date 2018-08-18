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
router.get("/customerIndex/:id", function(req, res) {
    Organization.findById(req.params.orgId, function(err, foundOrganization) {
        if(err) {
            res.redirect("/");
        } else {
            var orgId = req.user.customData.userOrg;
            Customer.find({"orgId" : orgId}, function(err, allCustomers) {
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
