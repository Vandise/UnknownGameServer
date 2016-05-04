let r = require('rethinkdb');

export default (server, session) => {
  server.r = r;
  server.conn = server.r.connect({host: server.configuration.database.host, port: server.configuration.database.port}, (err, conn) => {
    if (err) throw err;
    server.logger.info("Connected to database: " + server.configuration.database.host + " on port " + server.configuration.database.port);
    return conn;
  });
  server.logger.info("Loaded DB extension.");
};