import r       from 'rethinkdb';
import io      from 'socket.io-client';
import Auth    from '../../app/extensions/objects/input/auth';
import config  from '../helpers/db';

let chai    = require('chai');
let sinon   = require("sinon");
let expect  = chai.expect;
let host    = 'http://localhost:9090'; 
let socket  = null;
let auth    = new Auth();
let options = {
  transports: ['websocket'],
  'force new connection': true
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
        socket.disconnect();
        done(); 
      });
    });

  });

  describe("When a user is found", () => {

    before( () => {
      socket = io.connect(host, options);
    });

    it("Should send a success status code", (done) => {
      let input = [];
      input.push({name: "username", value: "username"});
      input.push({name: "password", value: "password"});
      socket.emit("login", input);
      socket.on("login", (resp) => {
        expect(resp.code).to.equals(1);
        socket.disconnect();
        done(); 
      });
    });

  });

  describe("When an invalid username/password combo is supplied", () => {

    before( () => {
      socket = io.connect(host, options);
    });

    it("Should send an unautorized status code", (done) => {
      let input = [];
      input.push({name: "username", value: "username"});
      input.push({name: "password", value: "failedpw"});
      socket.emit("login", input);
      socket.on("login", (resp) => {
        expect(resp.code).to.equals(2);
        socket.disconnect();
        done(); 
      });
    });

  });

});