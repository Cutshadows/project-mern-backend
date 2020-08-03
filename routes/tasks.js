const express=require('express');
const router=express.Router();
const {check}=require('express-validator');
const taskServices=require('../services/taskServices');
const auth=require('../middleware/authentication');

//crear una tarea
//api/tasks
router.post('/',
    auth,
    [
        check('nameTask', 'El nombre de la tarea es obligatorio').not().isEmpty(),
        check('project', 'El proyecto es obligatorio').not().isEmpty()
    ],
    taskServices.taskCreate
);
//Obtener las tareas por project
router.get('/',
    auth,
    taskServices.getTasks
);

//UPDATE TASK
router.put('/:id', 
    auth,
    taskServices.updateTask
);

//DELETE TASK
router.delete('/:id',
auth,
taskServices.deleteTask
);

module.exports=router;