const config = require('../configuracion/database');
const jwt = require('jsonwebtoken');
const resquest = require('request');
const Psicologo = require('../models/psicologo');

module.exports = (router) =>{
router.post('/registerpsi',(req,res)=>{
    let psic = new Psicologo();
    if (!req.body.email) {
        res.json({success: false, message: 'Favor de proporcionar un email'})
    } else {
         psic.email = req.body.email;
         psic.nombre = req.body.nombre;
         psic.password = req.body.password;
         psic.telefono = req.body.telefono;
         psic.cedula = req.body.cedula;
         psic.save((err)=>{
             if (err) {
                 if (err.code == 11000) {
                 res.json({success: false, message: 'Email ya registrado'})
                 } else {
                 res.json({success: false, message: err})
                 }
             } else {
                 res.json({success: true, message: 'Psicologo Guardado'})
             }
         })
     }
 })
 router.get('/test/:id', (req,res)=>{
     request('http://search.sep.gob.mx/solr/cedulasCore/select?fl=%2A%2Cscore&q='+ req.params.id + '&start=0&rows=1&wt=json', 
     function (error, response, body) {
         if (error) {
           res.json({error: error})
         } else {
           res.send(req.body)
         }
       });
   })

   router.post('/psilogin',(req,res)=>{
     if (!req.body.email) {
         res.json({success: false, message: 'Ingresar un email'})
     } else if(!req.body.password) {
         res.json({success: false, message: 'Ingresar una contraseña'})
     } else{
         Psicologo.findOne({email: req.body.email},(err,psic)=>{
             if (err) {
                 res.json({success: false, message: err})
             } else {
                 if (!psic) {
                     res.json({success: false, message: 'Psicologo no encontrado'})
                 } else {
                     const validPassword = psic.comparePass(req.body.password);
                     if (!validPassword) {
                         res.json({success: false, message: 'Contraseña incorrecta'})
                     } else {
                         const token = jwt.sign({psicId : psic._id}, config.secret,{expiresIn: '24h'});
                         res.json({success: true, message: 'Psicologo autenticado', token: token}) 
                     }
                 }
             }
         })
     }
 })



 //middleware
 router.use((req,res,next)=>{
     const token = req.headers['authorization'];
     if (!token) {
       res.json({succes: false, message:'Token requerido'})
     } else {
       jwt.verify(token, config.secret, (err, decoded) =>{
         if (err) {
           res.json({succes: false, message: 'Token invalido' + err})
         } else {
           req.decoded = decoded;
           next();
         }
       })
     }
   })
   


return router
}

