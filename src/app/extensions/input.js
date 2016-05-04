import Auth from './objects/input/auth';

class UserInput {
  constructor() {
    this.auth = new Auth();
  }
}

export default (server, session) => {
  server.input = new UserInput();
  server.logger.info("Loaded user input extension.");
};