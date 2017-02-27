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
    var client = new SparkPost('4c6dbaf145192b72b93bd1f3593a9cd13aa2ac36');
    var templateData;

router.use(function(req, res, next) {
  client.templates.list()
  .then(data => {
    console.log('Congrats you can use our client library!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });
    next();
  });

  router.get("/emailForm/", stormpath.loginRequired, stormpath.getUser, function(req, res) {
      Organization.findById(req.params.orgId, function(err, foundOrg) {
        var orgId = req.user.customData.userOrg;
        if (err){
          console.log(err);
        } else {
          client.templates.list(function(err, data) {
            if (err) {
              console.log('Whoops! Something went wrong');
              console.log(err);
            } else {
              console.log('Congrats you can use our client library!');
              console.log(data);
              data.results.forEach(function(indevidualTemplates){
                client.templates.get(indevidualTemplates.id, function(err, indevidualTemplates) {
                if (err) {
                  console.log('Whoops! Something went wrong');
                  console.log(err);
                } else {
                  console.log('**These are the indevidualTemplates**');
                  console.log(indevidualTemplates);
                }
              });
            });
              res.render("emailForm.ejs", {organization: foundOrg, templates: data.results, indevidualTemplates: data.results,});
          }
        });
        }
      });
  });



module.exports = router;
