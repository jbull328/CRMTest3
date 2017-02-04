var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
  cusFirstName : String,
  cusLastName : String,
  cusAddress : String,
  cusEmail : String,
});
var Customer = mongoose.model("Customer", customerSchema);

module.exports = mongoose.model("Customer", customerSchema);
