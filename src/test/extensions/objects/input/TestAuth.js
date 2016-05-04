import Auth from '../../../../app/extensions/objects/input/auth';

let chai    = require('chai');
let sinon   = require("sinon");
let expect  = chai.expect;
let auth = new Auth();

let expected = {
	username: /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/,
	password: /^.{5,512}$/
};

describe("Extensions::Objects::Input Auth", () => {

  describe("#process", () => {

    describe("When given invalid input", () => {
      it("Should return false", () => {
        let input = [];
        input.push({name: "username", value: '&^%$@*(!*#&$*^'});
        input.push({name: "password", value: "password"});
        
        expect(auth.process(expected, input)).to.eql(false);
      });
    });

    describe("When given valid input", () => {
      it("Should return an object", () => {
        let input = [];
        input.push({name: "username", value: "username"});
        input.push({name: "password", value: "password"});
        
        let result = auth.process(expected, input);
        expect(result).to.be.an('object');
        expect(result.username).to.equals('username');
        expect(result.password).to.equals('password');
      });
    });

  });  

  describe("#compare", () => {
    it("Should return true when given two equal strings", () => {
      let pw = "password";
      let hash = auth.hash(pw);
      expect(auth.compare(pw, hash)).to.eql(true);
    });
  });

});