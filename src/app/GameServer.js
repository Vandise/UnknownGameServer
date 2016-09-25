/*************************************************************************
 *
 * GameServer.js
 *
 *  Wrapper for required components throughout the gameserver.
 *  Everything aside from spinning up the server should be treated as
 *  as extension or channel.
 *
 *  Extensions:
 *    Anything that adds functionality to the gameserver. DB wrappers,
 *    AI, Encryption, etc.
 *
 *  Channels:
 *    Channels are simply groups of socket requests that the server can
 *    send/receive. Channels are loaded by the socket extension.
 *
 *************************************************************************/

import ConfReader    from './core/conf/ConfReader';
import LoggerFactory from './core/logger/LoggerFactory';
import express       from 'express';
import http          from 'http';
import fs            from 'fs';
import events        from 'events';
import socketio      from 'socket.io';

import ioClient from 'socket.io-client';

export default class GameServer {

  constructor(argv) {
    this.r        = null;
    this.fs       = fs;
    this.io       = null;
    this.env      = "dev";
    this.app      = express();
    this.conn     = null;
    this.root     = __dirname;
    this.port     = 9090;
    this.server   = http.createServer(this.app);
    this.session  = {};
    this.express  = express;
    this.event        = new events.EventEmitter();
    this.EventEmitter = events.EventEmitter;

    this.loginPort    = 4500;
    this.loginHost    = 'localhost';
    this.lsSocket     = null;

    this.dsPort       = 55960;
    this.dsHost       = 'localhost';
    this.dsSocket     = null;

    if(argv.indexOf("-e") != -1) { this.env = argv[(argv.indexOf("-e") + 1)]; }
    if(argv.indexOf("-p") != -1) { this.port = argv[(argv.indexOf("-p") + 1)]; }

    if(argv.indexOf("-lh") != -1) { this.loginHost = argv[(argv.indexOf("-lh") + 1)]; }
    if(argv.indexOf("-lp") != -1) { this.loginPort = argv[(argv.indexOf("-lp") + 1)]; }

    if(argv.indexOf("-dh") != -1) { this.dsHost = argv[(argv.indexOf("-dh") + 1)]; }
    if(argv.indexOf("-dp") != -1) { this.dsPort = argv[(argv.indexOf("-dp") + 1)]; }

    this.configuration = new ConfReader().read('dist/conf/'+this.env+'.yml');
    this.logger = LoggerFactory.get('bunyan', {name:'GameServer', level: this.configuration.logger.level});
  }

  main() {
    this.app.set('port', this.port);
    this.io = socketio.listen(this.server);
    this.connectLoginServer();
    this.connectDataServer();

    let dir = this.fs.readdirSync(this.root+'/extensions/');
    let index = 0;

  	for (index in dir) {
  		if (dir[index].match(/[a-z]\.js/)) {
  			require('./extensions/' + dir[index])(this);
  		}
  	}

    this.server.listen(this.app.get('port'), () => {
      this.logger.info('GameServer listening on port '+this.app.get('port')+' in '+this.env+' mode');
    });

  }

  connectLoginServer() {
    let lsTimer   = null;
    const options = {
      transports: ['websocket'],
      timeout: 1000
    };
    this.lsSocket = ioClient.connect(`http://${this.loginHost}:${this.loginPort}`, options);

    this.logger.info(`Attempting to connect to LS: ${this.loginHost}:${this.loginPort}`);

    lsTimer = setInterval(() => {
      if (this.lsSocket.connected) {
        clearInterval(lsTimer);
        return;
      }
      if (!this.lsSocket.connected) {
        this.logger.info(`Unable to connect to LS: ${this.loginHost}:${this.loginPort}`);
        return;
      }
    }, 2000);
  }

  connectDataServer() {
    let gsTimer = null;
    const options = {
      transports: ['websocket'],
      timeout: 1000
    };
    this.dsSocket = ioClient.connect(`http://${this.dsHost}:${this.dsPort}`, options);

    this.logger.info(`Attempting to connect to DS: ${this.dsHost}:${this.dsPort}`);

    gsTimer = setInterval(() => {
      if (this.dsSocket.connected) {
        clearInterval(gsTimer);
        return;
      }
      if (!this.dsSocket.connected) {
        this.logger.info(`Unable to connect to DS: ${this.dsHost}:${this.dsPort}`);
        return;
      }
    }, 2000);
  }

  close() {
    let index = 0;
    for (index in this.server.session) {
      let session = this.server.session[index];
      session.socket.disconnect(true);
    }
    this.lsSocket.disconnect(true);
    this.dsSocket.disconnect(true);
    this.io.close();
    this.conn.close();
    this.server.close();
  }

}