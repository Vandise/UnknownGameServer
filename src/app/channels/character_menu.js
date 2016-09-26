export default (server, session) => {
  let socket = session.socket;

  socket.on('fetch_characters', (currentUser) => {
    server.dsSocket.emit('fetch_characters', currentUser);
  });

  server.dsSocket.on('fetch_characters', (data) => {
    socket.emit('fetch_characters', data);
  });

};