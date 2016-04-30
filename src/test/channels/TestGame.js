
import io         from 'socket.io-client';
import GameServer from '../../app/GameServer';

let chai    = require('chai');
let sinon   = require("sinon");
let expect  = chai.expect;
let host    = 'http://localhost:9090'; 
let socket  = null;
let GS      = null;
let options = {
  transports: ['websocket'],
  'force new connection': true
};

let disconnect = () => {
  socket.disconnect();
};

describe("Channels::Game", () => {
/*
  before( () => {
    GS = new GameServer(['-e','test']);
    GS.main();
  });

  after(() => {
    GS.close();
  });
*/
  describe("On initial connect without a cookie", () => {
    
    before( () => {
      socket = io.connect(host, options);
    });

    it("should recieve a login frame", (done) => {
      socket.on("load-frame", (resp) => {
        expect(resp.component).to.equals("login");
        setTimeout(disconnect, 50);
        done(); 
      });
    });

  });

});