import bcrypt from 'bcrypt';

export default class Auth {

  process(expected, data) {
    var key = null;
    var i   = 0;
    var result = {};
    for(key in expected) {
      if(!data[i] || !(data[i].name in expected) || data[i].value.match(expected[key]) === null) {
        return false;
      }
      result[data[i].name] = data[i].value;
      i += 1;
    }
    return result;
  }

  hash(str) {
    return bcrypt.hashSync(str, 10);
  }

  compare(pass, hash) {
    return bcrypt.compareSync(pass, hash);
  }

}