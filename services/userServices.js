const User=require('../models/UserModel');
const bcryptjs=require('bcryptjs');
const {validationResult} =require('express-validator');
const jwt=require('jsonwebtoken');

exports.createUsers=async (req, res)=>{
   //revisar si hay errores
   const errors= validationResult(req);
   if(!errors.isEmpty()){
      res.status(400).json({errors: errors.array()})
   }
   //destructuring de las variables del req.body
   const {email, password}=req.body;

   try {
      let user= await User.findOne({email});
      
      if(user){
         return res.status(400).json({
            msg: 'El usuario ya existe'
         })
      }
      //Create new user
      user=new User(req.body);

      //hash password
      const salt=await bcryptjs.genSalt(10);
      user.password=await bcryptjs.hash(password, salt);

      //save user
     await user.save();

     //create and sign with JWT
     const payload={
         user:{
            id:user.id
         }
     };
     //sign the jwt
     jwt.sign(payload, process.env.SECRET, {
         expiresIn:3600//segundos
      },(error, token)=>{
         if(error)throw error;

         //Mensaje de configuracion
            res.status(200).json({token});
      });

     //mensaje de confirmacion
    /*   res.status(200);.send({
       msg: 'Usuario creado correctamente'
      }); */
      
   } catch (error) {
         res.status(400).send('Hubo un error');
   }
}     