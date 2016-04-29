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

import cookieParser from 'socket.io-cookie-parser';

export default (server) => {

  var index;
  let channels = [];
	let dir = server.fs.readdirSync(server.root+'/channels');

	for (index in dir) {
		channels.push(require(server.root+'/channels/' + dir[index]));
	}
	
	server.io.use(cookieParser());
	
  server.io.on('connection', (socket) => {

    server.logger.info("User Connected.");
    server.session[socket.id] = {
      id: socket.id,
      socket: socket,
      event: new server.EventEmitter()
    };
    
    socket.on('disconnect', () => {
      server.logger.info("User Disconnected.");
      delete server.session[socket.id];
    });
    
    // send the user & game state based off of cookie information
    // bound to a socket id
    let i = 0;
		for (i in channels) {
			channels[i](server, server.session[socket.id]);
		}
		
  });

  server.logger.info("Loaded socket extension.");
};