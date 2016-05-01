let LoginStatus = {
  unknown: "(0) An unknown error has occured.",
  success: "(1) Login Successful.",
  unauthorized: "(2) Invalid Username and Password.",
  notfound: "(3) User not found."
};

let statusCode = (key) => {
  return Object.keys(LoginStatus).indexOf(key) > -1 ? Object.keys(LoginStatus).indexOf(key) : 0;
};

export default (server, session) => {
  let socket = session.socket;

  //
  // TODO:
  //  When I decide on a database, query the DB and look for a user
  //  for both the cookie and socket login event
  //
  if (socket.request.cookies.sessionID) {
    let user = null;
    if(user !== null) {
      server.logger.info("Authorizing user via cookie.");
      session.event.emit('logged_in', true);
    } else {
      server.logger.info("Authorizing user via cookie failed.");
      session.event.emit('logged_in', false);
    }
  }

  socket.on("login", (data) => {
    let user = null;
    if(user === null) {
      socket.emit('login', {'status': LoginStatus.notfound, 'code': statusCode("notfound")});
    } else {
      // probably won't be used on the client, but will serve well for debugging purposes
      // just need to test that the logged_in event was called in mocha, but no DB yet!
      socket.emit('login', {'status': LoginStatus.success, 'code': statusCode("success")});
      session.event.emit("logged_in", true);
    }
  });

};