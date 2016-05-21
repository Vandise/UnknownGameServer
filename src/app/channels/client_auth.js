import { CLIENT_VERSION } from '../constants';

export default (server, session) => {
  let socket = session.socket;
  socket.on('authenticate_client_version', (data) => {
    let s = 0;
    if (CLIENT_VERSION === data.version)
      s = 1;
  
    socket.emit('authenticate_response',{status: s});
    return;
  });
};