module.exports = function(db, conn, conf) {
  return db.db(conf.database.name).tableCreate("accounts").run(conn);
};