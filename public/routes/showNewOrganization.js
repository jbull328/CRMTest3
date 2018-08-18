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

router.get("/userNew", function(req, res) {
  var orgId = req.user.customData.userOrg;
  if (req.user.customData.userOrg != null) {
    res.redirect("/customerIndex/" + orgId);
  } else {
    res.render("userNew.ejs");
  }

});

module.exports = router;
