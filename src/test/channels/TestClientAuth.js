import io from 'socket.io-client';
import { CLIENT_VERSION } from '../../app/constants';

let chai    = require('chai');
let sinon   = require("sinon");
let expect  = chai.expect;
let host    = 'http://localhost:9090'; 
let socket  = null;
let options = {
  transports: ['websocket'],
  'force new connection': true
};

let disconnect = () => {
  socket.disconnect();
};

describe("Channels::ClientAuth", () => {

  describe("authenticate_client_version", () => {

    describe("with a matching client version", () => {
      before( () => {
        socket = io.connect(host, options);
      });
  
      it("should recieve a status of 1", (done) => {
        socket.emit('authenticate_client_version', {
          version: CLIENT_VERSION
        });
        socket.on("authenticate_response", (resp) => {
          expect(resp.status).to.equals(1);
          socket.disconnect();
          done(); 
        });
      });
    });

    describe("with an invalid client version", () => {
      before( () => {
        socket = io.connect(host, options);
      });
  
      it("should recieve a status of 0", (done) => {
        socket.emit('authenticate_client_version', {
          version: '0.0.0'
        });
        socket.on("authenticate_response", (resp) => {
          expect(resp.status).to.equals(0);
          socket.disconnect();
          done(); 
        });
      });
    });

  });

});