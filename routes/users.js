const express=require('express');
const router=express.Router();
const userServices=require('../services/userServices');
const {check}=require('express-validator');
//crear usuario

//api/usuarios
router.post('/',
[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email valido') .isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({min:6}),

],
    userServices.createUsers
);

module.exports=router;