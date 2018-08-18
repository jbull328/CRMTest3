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
router.put('/customer/:id',  function(req, res) {
  // req.body.customer.body = req.sanitize(req.customer.customer.body);
  var orgId = req.user.customData.userOrg;
  Customer.findByIdAndUpdate(req.params.id, req.body.customer, function(err, updatedCustomer) {
    if (err) {
      console.log(err);
      res.redirect("customerIndex/" + orgId);
    } else {
      res.redirect("/customerIndex/" + orgId);
    }
  });
});

router.delete("/customer/:id",  function(req, res) {
  var orgId = req.user.customData.userOrg;
  Customer.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log(err);
      res.redirect("customerIndex/" + orgId);
    } else {
      console.log("success")
      res.redirect("/customerIndex/" + orgId);
    }
  });
});

module.exports = router;
