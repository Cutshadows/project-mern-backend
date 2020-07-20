const express=require('express');
const router=express.Router();
const {check}=require('express-validator');
const projectServices=require('../services/projectServices');
const auth=require('../middleware/authentication');
//crear token de la sesion
//api/projects
router.post('/',
    auth,
    [
     check('projectName', 'El campo nombre debe tener valor').isEmpty()
    ],
    projectServices.projectServices
);
router.get('/',
    auth,
    [
     check('projectName', 'El campo nombre debe tener valor').isEmpty()
    ],
    projectServices.projectServices
);

module.exports=router;