export default (server, session) => {
  let socket = session.socket;

  socket.on('login_attempt', (data) => {
    console.log('Attempting to login: ');
    console.log(data);
    server.lsSocket.emit('login', data);
  });

  server.lsSocket.on('login', (data) => {
    console.log('Login Server login resp: ');
    console.log(data);
  });
  
};