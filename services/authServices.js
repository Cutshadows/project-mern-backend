const User=require('../models/UserModel');
const bcryptjs=require('bcryptjs');
const { validationResult } =require('express-validator');
const jwt=require('jsonwebtoken');


exports.authUser=async(req, res)=>{
    //revisar si hay errores
    const errores=validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }


    //extraer ek email y password
    const {email, password}=req.body;
    try {
        //revisar
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:'Usuario no existe'})
        }
        //revisar password
        const correctPass=await bcryptjs.compare(password, user.password);
        if(!correctPass){
            return res.status(400).json({msg:'Password no es correcto'})
        }

        //crear la session
        const payload={
            user:{
                id:user.id
            }
        }
        jwt.sign(payload, process.env.SECRET,{
            expiresIn:3600
        }, (error, token)=>{
            if(error)throw error;

            //Mensaje de confirmacion
            res.json({token});
        })
    } catch (error) {
        console.log(error)
    }

}
//Get user authenticated
exports.authenticatedUser=async(req, res)=>{
    try {
        const users=await User.findById(req.user.id).select('-password');
        res.json({
            users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hubo un error'});
    }
}