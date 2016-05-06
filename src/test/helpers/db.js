import r          from  'rethinkdb';
import ConfReader from '../../app/core/conf/ConfReader';

let reader = new ConfReader().read('dist/conf/test.yml');

export default  {host: reader.database.host, port: reader.database.port, db: reader.database.name};