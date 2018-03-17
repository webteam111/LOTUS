const config = require('../configuracion/database');
const User = require('../models/usuario');
const Psicologo = require('../models/psicologo');

module.exports = (router) =>{
    
router.get('/Profile',(req,res)=>{
    User.findOne({_id: req.decoded.userId}, (err,user)=>{
        if (err){
            res.json({succes:false, message: err})
         } else {
               res.json({succes: true,message: user})

            }
        })
    })
    router.get('/usuarios', (req,res)=>{
        User.find({}, (err, user)=>{
            if (err) {
                res.json({succes: false, message: err})
            } else {
                res.json({succes: true, message: user})
            }
        })
    })


    router.put('/Usuario',(req,res)=>{
        User.update({_id: req.decoded.userId},{$push: { 'Usuario': {
        'nombre': req.body.nombre,
        'telefono': req.body.telefono,
        'email': req.body.email,
        
        }}},(err,user)=>{
            if (err) {
                res.json({succes: false, message: err})
            } else {
                res.json({succes: true, message: 'Campos Actualizados'})
            }
        
        })

    })
    router.delete('/usuario', (req,res)=>{
        User.remove({User: req.params.user},(err, user)=>{
            if (err) {
                res.json({succes:false, message: err})
            } else {
                res.json({succes: true, message: user})
            }
        })
    })
    router.get('/psi',(req,res)=>{
        Psicologo.findOne({_id: req.decoded.psicrId}, (err,psic)=>{
            if (err){
                res.json({succes:false, message: err})
             } else {
                   res.json({succes: true,message: psic})
    
                }
            })
        })
    
    
    
        router.put('/psicologo',(req,res)=>{
            Psicologo.update({_id: req.decoded.userId},{$push: { 'psicologo': {
            'nombre': req.body.nombre,
            'email': req.body.email,
            'telefono': req.body.telefono,
            'cedula': req.body.cedula,
            
            }}},(err,psic)=>{
                if (err) {
                    res.json({succes: false, message: err})
                } else {
                    res.json({succes: true, message: 'Campos Actualizados'})
                }
            
            })
    
        })

  



    return router
}


