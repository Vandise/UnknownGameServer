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
    this.event    = new events.EventEmitter();
    this.EventEmitter = events.EventEmitter;
    
    if(argv.indexOf("-e") != -1) { this.env = argv[(argv.indexOf("-e") + 1)]; }
    if(argv.indexOf("-p") != -1) { this.port = argv[(argv.indexOf("-p") + 1)]; }

    this.configuration = new ConfReader().read('dist/conf/'+this.env+'.yml');
    this.logger = LoggerFactory.get('bunyan', {name:'GameServer', level: this.configuration.logger.level});
  }

  main() {
    this.app.set('port', this.port);
    this.io = socketio.listen(this.server);
    
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

  close() {
    this.conn.close();
    this.server.close();
  }

}