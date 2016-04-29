/*************************************************************************
 *
 * Server.js
 *  Passes arguments and boots up the Gameserver.
 *
 *************************************************************************/

import GameServer from './app/GameServer';

let GS = new GameServer(process.argv);
GS.main();