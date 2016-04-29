/*************************************************************************
 *
 * socket.js
 *
 *  Loads groups of socket requests that the server can
 *  send/receive.
 *
 *  Handles two socket messages:
 *    connection:
 *      adds the socket id to the server session
 *    disconnect:
 *      removes the socket id from the server session
 *
 *************************************************************************/
 
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