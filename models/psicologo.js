const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');



const PsicSchema = new Schema({
   nombre: {type: String},
   telefono: {type: String},
   email: {type: String, unique: true, required: true},
   password: {type: String},
   cedula:{type:String},
   request:[{
       motivo: String,
       fecha: Date,
       usuario: String
   }]
  });

  PsicSchema.pre('save', function(next){
    if (!this.isModified('password')) {
      return next();
    }
    else{
      bcrypt.hash(this.password, null, null,(err, hash)=>{
        if (err) return next(err);
        else{
          this.password = hash;
          next();
        }
      })
    }
  });
  
  PsicSchema.methods.comparePass = function(password){
    return bcrypt.compareSync(password, this.password);
  }
  
  

  module.exports = mongoose.model('psicologo',PsicSchema)