
import io         from 'socket.io-client';

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

describe("Channels::Login", () => {

  describe("When a user isn't found", () => {

    before( () => {
      socket = io.connect(host, options);
    });

    it("should recieve a notfound status", (done) => {
      socket.emit("login", {});
      socket.on("login", (resp) => {
        expect(resp.code).to.equals(3);
        setTimeout(disconnect, 50);
        done(); 
      });
    });

  });

});