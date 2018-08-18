var express = require("express"),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Organization = require("../models/organization"),
    Customer = require("../models/customer"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

var SparkPost = require('sparkpost');
var client = new SparkPost('4c6dbaf145192b72b93bd1f3593a9cd13aa2ac36');


router.use(function(req, res, next) {
  var subject = req.body.subject;
  var emailText = req.body.emailText;
  var ccEmail = req.body.ccEmail;
  client.transmissions.send({
      options: {
        sandbox: false
      },
      content: {
        from: 'info@jbull.co',
        subject: subject,
        html:'<html><body><p>'+ emailText +'</p></body></html>'
      },
      recipients: [
        {address: 'jackbull328@gmail.com'}
      ]
    })
    .then(data => {
      console.log('Woohoo! You just sent your first mailing!');
      console.log(emailText);
      console.log(data);
    })
    .catch(err => {
      console.log('Whoops! Something went wrong');
      console.log(err);
    });
  next();
});

router.post('/emailSend',  function(req, res) {
  var orgId = req.user.customData.userOrg;
  res.redirect("/customerIndex/"+ orgId);
});

  module.exports = router;
