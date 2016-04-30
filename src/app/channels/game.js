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

  let sendLoginForm = () => {
    socket.emit("load-frame", {
      component: "login"
    });
    server.logger.info("Load frame: login form sent.");
  };
  
  let sendGame = () => {
    socket.emit("load-frame", {
      component: "game"
    });
    server.logger.info("Load frame: game sent.");
  };

  if(!socket.request.cookies.sessionID) {
    sendLoginForm();
  }

  session.event.on("logged_in", (status) => {
    if(status === true) {
      sendGame();
    } else {
      sendLoginForm();
    }
  });

  server.logger.info("Loaded game channel.");
};