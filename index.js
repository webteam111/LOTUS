
'use strict'
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./configuracion/database');
const router = express.Router();
const api = require('./routes/api')(router);
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080


mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) =>{
  if (err) {
    console.log(err);
  } else {
    console.log("Connected");
  }
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', api);

app.listen(port, ()=>{
    console.log("conectado"+ port);
  });

