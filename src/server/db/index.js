import * as mysql from 'mysql';
import config from '../config';

import SchoolZombies from './schoolzombies';
import HospitalZombies from './hospitalzombies';
import WarehouseZombies from './warehousezombies';

export const Connection = mysql.createConnection(config.mysql);

Connection.connect(err => {
    if(err) console.log(err);
});

export default {
    SchoolZombies,
    HospitalZombies,
    WarehouseZombies
}