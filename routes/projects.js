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
     check('projectName', 'El campo nombre debe tener algun valor').not().isEmpty()
    ],
    projectServices.projectServices
);
router.get('/',
    auth,
    projectServices.getProjects
);

//actualizar proyectos
router.put('/:id',
    auth,
    [
        check('projectName', 'El campo nombre debe tener algun valor').not().isEmpty()
    ],
    projectServices.updateProject
);

router.delete('/:id',
    auth,
    projectServices.deleteProject
);

module.exports=router;