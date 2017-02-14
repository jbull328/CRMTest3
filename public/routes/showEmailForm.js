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

router.get("/emailForm/", stormpath.loginRequired, stormpath.getUser, function(req, res) {
    console.log("the send email button has been clicked");
    res.render("emailForm.ejs");
});

module.exports = router;
