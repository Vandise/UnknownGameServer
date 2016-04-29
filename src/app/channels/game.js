/*************************************************************************
 *
 * game.js
 *
 *  Checks the current state of the cookie attached to the socket
 *  and will emit a message to the client based off of that state.
 *
 *    sendLoginForm
 *      When the socket.request.cookies.sessionID is empty/null
 *
 *    sendGame
 *      When a logged_in event is emitted to session.event and is true
 *      otherwise emit sendLoginForm with error
 *
 *************************************************************************/
 
export default (server, session) => {
  let socket = session.socket;
  
  server.logger.info("Loaded game channel.");
};