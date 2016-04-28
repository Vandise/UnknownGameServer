import ConfReader    from './core/conf/ConfReader';
import LoggerFactory from './core/logger/LoggerFactory';
import express       from 'express';
import http          from 'http';

let app    = express();
let server = http.createServer(app);

export default class GameServer {

  constructor(argv) {
    this.port   = 9090;
    this.env    = "dev";
    this.logger = LoggerFactory.get('bunyan', {name:'GameServer'});

    if(argv.indexOf("-e") != -1) { this.env = argv[(argv.indexOf("-e") + 1)]; }
    if(argv.indexOf("-p") != -1) { this.port = argv[(argv.indexOf("-p") + 1)]; }

    this.configuration = new ConfReader().read('dist/conf/'+this.env+'.yml');
  }

  main() {
    app.set('port', this.port);
    server.listen(app.get('port'), () => {
      this.logger.info('GameServerlistening on port '+app.get('port')+' in '+this.env+' mode');
    });
  }

}