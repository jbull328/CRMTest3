var mongoose = require('mongoose');

var organizationSchema = new mongoose.Schema({
  orgName : String,
  orgId : String,
  givenName : String,
  surname : String,
  userEmail: String,
});
var Organization = mongoose.model("Organization", organizationSchema);

module.exports = mongoose.model("Organization", organizationSchema);
