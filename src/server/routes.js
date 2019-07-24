import * as express from 'express';

import DB from './db';

const router = express.Router();

router.get('/api/schoolzombies', async (req, res) => {
  try {
      let schoolzombies = await DB.SchoolZombies.all();
      res.json(schoolzombies);
  } catch (e) {
      console.log(e);
      res.sendStatus(500);
  }
});

router.get('/api/hospitalzombies', async (req, res) => {
  try {
      let hospitalzombies = await DB.HospitalZombies.all();
      res.json(hospitalzombies);
  } catch (e) {
      console.log(e);
      res.sendStatus(500);
  }
});

router.get('/api/warehousezombies', async (req, res) => {
  try {
      let warehousezombies = await DB.WarehouseZombies.all();
      res.json(warehousezombies);
  } catch (e) {
      console.log(e);
      res.sendStatus(500);
  }
});

export default router;