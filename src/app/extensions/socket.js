//
// Handles basic socket connection information
//  Imports socket channels
//

export default (server) => {
  server.logger.info("Loaded socket extension.");

  server.io.on('connection', (socket) => {
    server.logger.info("User Connected.");
    server.session[socket.id] = {
      id: socket.id
    };
    socket.on('disconnect', () => {
      server.logger.info("User Disconnected.");
      delete server.session[socket.id];
    });
    socket.emit("message", socket.id);
  });
};