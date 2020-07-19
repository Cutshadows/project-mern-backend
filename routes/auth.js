const express=require('express');
const router=express.Router();
const authServices=require('../services/authServices');
const {check}=require('express-validator');
//crear token de la sesion

//api/auth
router.post('/',
[
    check('email', 'Agrega un email valido') .isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({min:6})
],
    authServices.authUser
);

module.exports=router;