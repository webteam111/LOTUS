
'use strict'
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./configuracion/database');
const router = express.Router();
const paciente = require('./routes/paciente')(router);
const psicologo= require('./routes/psicologo')(router);
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
app.use('/paciente', paciente)
app.use('/psicologo',psicologo);


app.listen(port, ()=>{
    console.log("conectado"+ port);
  });

