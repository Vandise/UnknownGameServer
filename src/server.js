import ConfReader    from './app/core/conf/ConfReader';
import LoggerFactory from './app/core/logger/LoggerFactory';
import GameServer    from './app/GameServer';

let GS = new GameServer(process.argv);
GS.main();