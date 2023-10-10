"use strict";

module.exports = function (app) {
  var jsonku = require("./controller");

  app.route("/").get(jsonku.index);

  app.route("/user").get(jsonku.getAllUser);

  app.route("/user/:id").get(jsonku.getUserById);

  app.route("/add").post(jsonku.createNewUser);

  app.route("/edit").put(jsonku.editUser);
};
