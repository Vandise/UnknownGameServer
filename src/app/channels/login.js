export default (server, session) => {
  let socket = session.socket;

  socket.on('login_attempt', (data) => {
    server.lsSocket.emit('login', data);
  });

  server.lsSocket.on('login', (data) => {
    socket.emit('login_attempt', data);
  });
  
};