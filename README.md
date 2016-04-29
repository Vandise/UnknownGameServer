# UnknownGameServer [![Build Status](https://travis-ci.org/Vandise/UnknownGameServer.svg?branch=master)](https://travis-ci.org/Vandise/UnknownGameServer)

The game server for an unknown multiplayer arcade game. Written with ES6, SocketIO, and possibly RethinkDB to simplify some of the server logic on handling player x-y coordinates.

## Getting Started
Major Dependencies:
* Node >= 5.0
* NPM >= 3.5
* Mocha >= 2.2

### Install Dependencies
this might take awhile.
```
npm install
```

### Run Tests
and watch them pass hopefully.
```
gulp test
```

### Server Environment
The server can be run in three different environments:
* Development (dev)
* Production (prod)
* Test (test)
You can configure some settings in src/conf/[my_env].yml

Each environment can utilize a different database and display different console / log different messages. I suggest you use only the dev and prod options.

You can also pass specific arguments to the game server at runtime:
```
# -e [environment] -p [port number]
node ./dist/server -e dev -p 9000
```

By default
```
npm start
```
Runs the server on port 9090 in the development environment.

## Server Architecture
The server architecture follows a simple but difficult concept to utilize with Node Servers: avoid callbacks when possible. In its most primitive state, the server simply accepts a socket connection, recieves messages with a cookie bound to the socket from the client, and has events bound to a session object containing the socket information in the server. All the actions and events that can be recieved by the socket are contained in the src/app/channels directory. The server itself handles only a connect and disconnect message.

### Channels
Channels are simply all the messages and events a particular socket in the servers session object can receive / listen to.

### Extensions
Extensions are anything that adds functionality to the game server. By itself the game server is simply an object that spins up a server based off of the configuration settings it's passed. Prior to starting up the server, it loads every module in the extensions directory and passes an instance of itself as a parameter. The GameServer object has no knowledge to the functionality of these modules -- making each component of the server as easily testable as web sockets allow you to test. 

## Contributing
If you wish to contribute, send me an email before sending a pull request or creating an issue. I know the game I want to build and it'll be great for other contributors to understand its goals.
