import ConfReader    from './core/conf/ConfReader';
import LoggerFactory from './core/logger/LoggerFactory';
import express       from 'express';
import http          from 'http';
import fs            from 'fs';
import events        from 'events';
import socketio      from 'socket.io';

let app    = express();
let server = http.createServer(app);

export default class GameServer {

  constructor(argv) {
    this.fs       = fs;
    this.io       = null;
    this.env      = "dev";
    this.root     = __dirname;
    this.port     = 9090;
    this.session  = {};
    this.express  = express;
    this.eEmitter = events.EventEmitter;
    this.event    = new events.EventEmitter();
    
    if(argv.indexOf("-e") != -1) { this.env = argv[(argv.indexOf("-e") + 1)]; }
    if(argv.indexOf("-p") != -1) { this.port = argv[(argv.indexOf("-p") + 1)]; }

    this.configuration = new ConfReader().read('dist/conf/'+this.env+'.yml');
    this.logger = LoggerFactory.get('bunyan', {name:'GameServer', level: this.configuration.logger.level});
  }

  main() {
    let dir = this.fs.readdirSync(this.root+'/extensions/');
    let index = 0;
    
    app.set('port', this.port);
    this.io = socketio.listen(server);
    
  	for (index in dir) {
  		if (dir[index].match(/[a-z]\.js/)) {
  			require('./extensions/' + dir[index])(this);
  		}
  	}

    server.listen(app.get('port'), () => {
      this.logger.info('GameServerlistening on port '+app.get('port')+' in '+this.env+' mode');
    });
  }

  close() {
    server.close();
  }

}