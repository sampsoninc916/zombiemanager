import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../App';
import apiRouter from './routes';
import { Connection } from './db/index';

const app = express();
const port = process.env.PORT || 5000;

app.use(apiRouter);

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '../../../public/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.post('/api/newzombie/:zone', (request, response) => {
  if (!Array.isArray(request.body.firstname)) {
    const firstname = request.body.firstname;
    const lastname = request.body.lastname;
    const peopleinfected = request.body.peopleinfected;
    const severity = request.body.severity;
    const zone = request.params.zone;
    Connection.query("INSERT INTO `zombies`.`zombies` (`firstname`, `lastname`, `peopleinfected`, `severity`, `location`) VALUES ('" + firstname + "', '" + lastname + "', '" + peopleinfected + "', '" + severity + "', '" + zone + "');", (err, results) => {
      if(err) {
          console.log(err);
      }
      console.log('data inserted');
    });
  } else {
    for (let i = 0; i < request.body.firstname.length; i++) {
      const firstname = request.body.firstname[i];
      const lastname = request.body.lastname[i];
      const peopleinfected = request.body.peopleinfected[i];
      const severity = request.body.severity[i];
      const zone = request.params.zone;
      Connection.query("INSERT INTO `zombies`.`zombies` (`firstname`, `lastname`, `peopleinfected`, `severity`, `location`) VALUES ('" + firstname + "', '" + lastname + "', '" + peopleinfected + "', '" + severity + "', '" + zone + "');", (err, results) => {
        if(err) {
            console.log(err);
        }
        console.log('data inserted');
      });
    }
  }
  response.redirect(`/${request.params.zone}`);
});

app.post('/api/changelocation/:firstname/:lastname/:zone', (request, response) => {
  const firstname = request.params.firstname;
  const zone = request.body.location;
  const redirectZone = request.params.zone;
  Connection.query("UPDATE `zombies`.`zombies` SET location='" + zone + "' WHERE firstname='" + firstname + "';", (err, results) => {
    if(err) {
        console.log(err);
    }
    console.log('data inserted');
  });
  response.redirect(`/${redirectZone}`);
});