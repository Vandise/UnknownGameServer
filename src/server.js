/*************************************************************************
 *
 * Server.js
 *  Passes arguments and boots up the Gameserver.
 *
 *************************************************************************/

import GameServer from './app/GameServer';

let GS = new GameServer(process.argv);
GS.main();

process.stdin.resume();

process.on('SIGINT', () => {
  GS.close();
  process.exit(2);
});