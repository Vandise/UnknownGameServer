let LoginStatus = {
  unknown: "(0) An unknown error has occured.",
  success: "(1) Login Successful.",
  unauthorized: "(2) Invalid Username and Password.",
  notfound: "(3) User not found."
};

let loginExpects = {
	username: /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/,
	password: /^.{5,512}$/
};

let statusCode = (key) => {
  return Object.keys(LoginStatus).indexOf(key) > -1 ? Object.keys(LoginStatus).indexOf(key) : 0;
};

export default (server, session) => {
  let socket = session.socket;

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
    let result = server.input.auth.process(loginExpects, data);
    
    if(!result) {
      
      server.logger.info("Data validation failed.");
      socket.emit('login', {'status': LoginStatus.notfound, 'code': statusCode("notfound")});
      
    } else {
      
      server.r.table("accounts").filter(server.r.row('username').eq(result.username)).limit(1).run(server.conn, (err, cursor) => {

        if(err) {
          server.logger.info("User not found.");
          socket.emit('login', {'status': LoginStatus.notfound, 'code': statusCode("notfound")});
          return;
        }
        
        return cursor.toArray((err, records) => {
          
          if(err || records[0] === undefined) {
            socket.emit('login', {'status': LoginStatus.unknown, 'code': statusCode("unknown")});
            return;
          }
          
          let user = records[0];
          
          if(!server.input.auth.compare(result.password, user.password)) {
            server.logger.info("Username/password not valid.");
            socket.emit('login', {'status': LoginStatus.unauthorized, 'code': statusCode("unauthorized")});
            return;
          }
          
          session.user = user;
          socket.emit('login', {'status': LoginStatus.success, 'code': statusCode("success")});
          session.event.emit("logged_in", true);

          server.logger.info("Login Success.");
          
          return;
        });
      });
    }
  });

};