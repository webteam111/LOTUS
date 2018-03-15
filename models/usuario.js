const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


const userSchema = new Schema({
   email: {type: String, unique: true, required: true},
   nombre: {type: String},
   password: {type: String},
   client:[{
     nombre: {type: String},
     telefono: {type: Number},
     email: {type: String}
    
   }]
  });

  userSchema.pre('save', function(next){
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
  
  userSchema.methods.comparePass = function(password){
    return bcrypt.compareSync(password, this.password);
  }
  

  module.exports = mongoose.model('usuario',userSchema)
  
