var Auth = require('../../dist/app/extensions/objects/input/auth');
var pw = new Auth();

module.exports = function(db, conn, conf) {
  return db.db("gs_test").table("accounts").insert({
    username: "username",
    password: pw.hash("password")
  }).run(conn);
};