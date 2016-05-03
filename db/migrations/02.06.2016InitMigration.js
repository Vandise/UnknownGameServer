module.exports = function(db, conn, conf) {
  return db.db(conf.database.name).table("migrations").run(conn);
};