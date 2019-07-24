import { Connection } from './index';

const all = async (username) => {
    return new Promise((resolve, reject) => {
      Connection.query("SELECT * FROM zombies.zombies WHERE location='school';", (err, results) => {
          if(err) {
              return reject(err);
          }
          resolve(results);
      });
    });
}

export default {
    all
};