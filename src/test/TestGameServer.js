import GameServer from '../app/GameServer';
import io         from 'socket.io-client';

let chai    = require('chai');
let sinon   = require("sinon");
let expect  = chai.expect;
let host    = 'http://localhost:9091'; 
let socket  = null;
let GS      = null;
let options = {
  transports: ['websocket'],
  'force new connection': true
};

let disconnect = () => {
  socket.disconnect();
};

/*
  
  TODO: Ping GS API, don't spin up new instance
  
describe('GameServer', () => {

  before( () => {
    GS = new GameServer(['-e','test', '-p', '9091']);
    GS.main();
  });

  after(() => {
    GS.close();
  });
    
  describe("On Socket Connect", () => {

    before(() => {
      socket = io.connect(host, options);
    });
    
    it("Should register the socket in the sessions list", (done) => {
      socket.on("connect", () => {
        expect(Object.keys(GS.session).length).to.equals(1);
        setTimeout(disconnect, 50);
        socket.on("disconnect", () => {
          done();
        });
      });
    });
  });

  describe("On Socket Disconnect", () => {
    
    before(() => {
      socket = io.connect(host, options);
    });
    
    it("Should remove the socket from the sessions list", (done) => {
      setTimeout(disconnect, 50);
      socket.on("disconnect", () => {
        setTimeout( () => {
          expect(Object.keys(GS.session).length).to.equals(0);
          done();
        }, 50);
      });
    });
        
  });

});
*/