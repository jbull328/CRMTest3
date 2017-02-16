var express = require("express"),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Organization = require("../models/organization"),
    Customer = require("../models/customer"),
    stormpath = require('express-stormpath'),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

var SparkPost = require('sparkpost');
var client = new SparkPost('Eac9af8c3f55a9e8d6d0ce0b66ea0df89c410105');


router.use(function(req, res, next) {

  client.transmissions.send({
      options: {
        sandbox: true
      },
      content: {
        from: 'testing@sparkpostbox.com',
        subject: 'Hello, World!',
        html:'<html><body><p>Testing SparkPost - the world\'s most awesomest email service!</p></body></html>'
      },
      recipients: [
        {address: 'jackbull328@gmail.com'}
      ]
    })
    .then(data => {
      console.log('Woohoo! You just sent your first mailing!');
      console.log(data);
    })
    .catch(err => {
      console.log('Whoops! Something went wrong');
      console.log(err);
    });
  next();
});

router.post('/newCustomer', stormpath.loginRequired, function(req, res) {
  var orgId = req.user.customData.userOrg;
  res.redirect("customerIndex.ejs", orgId);
});
  module.exports = router;
