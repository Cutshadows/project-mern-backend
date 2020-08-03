const TaskModels=require('../models/TaskModels');
const ProjectModel=require('../models/ProjectModels.js');
const {validationResult}=require('express-validator');

exports.taskCreate=async(req, res)=>{
    //Revisar si hay errores
    const errores=validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }
    //Extraer el proyecto y comprobar si existe

    try {
        const {project}=req.body;
        const existProject=await ProjectModel.findById(project);
        if(!existProject){
            res.status(404).json({msg:'Proyecto no encontrado'});
        }
        //Revisar si el proyecto actual pertenece al usuario
        //verificar el creador del proyecto
        if(existProject.author.toString()!==req.user.id){
            return res.status(401).json({msg:'No Autorizado'});
        }

        //creamos la tarea
        const task=new TaskModels(req.body);
        await task.save();
        res.json({task});
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}

exports.getTasks=async(req, res)=>{
    try {
        const {project}=req.body;
        const existProject=await ProjectModel.findById(project);
        if(!existProject){
            res.status(404).json({msg:'Proyecto no encontrado'});
        }
        //Revisar si el proyecto actual pertenece al usuario
        //verificar el creador del proyecto
        if(existProject.author.toString()!==req.user.id){
            return res.status(401).json({msg:'No Autorizado'});
        }

        //Obtener tareas
        const tasks=await TaskModels.find({project});
        res.status(200).json({
            tasks
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el servidor');
    }
}

exports.updateTask=async(req, res)=>{
    try {
        const {project, nameTask, status}=req.body;
        //si la tarea existe o no
        let taskExist=await TaskModels.findById(req.params.id);
        if(!taskExist){
            res.status(404).json({msg:'Tarea no existe'});
        }
        const projectExist=await ProjectModel.findById(project);
        //Revisar si el proyecto actual pertenece al usuario
        //verificar el creador del proyecto
        if(projectExist.author.toString()!==req.user.id){
            return res.status(401).json({msg:'No Autorizado'});
        }


        //crear un objeto con la nueva informacion
        const newTask={};
        if(nameTask)newTask.nameTask=nameTask;
        if(status)newTask.status=status;
        //Guardar la tarea
        task=await TaskModels.findOneAndUpdate({_id:req.params.id}, newTask, {new:true});
        res.json({task});
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}
exports.deleteTask=async(req, res)=>{
    try {
        const {project, nameTask, status}=req.body;
        //si la tarea existe o no
        let taskExist=await TaskModels.findById(req.params.id);
        if(!taskExist){
            res.status(404).json({msg:'Tarea no existe'});
        }
        const projectExist=await ProjectModel.findById(project);
        //Revisar si el proyecto actual pertenece al usuario
        //verificar el creador del proyecto
        if(projectExist.author.toString()!==req.user.id){
            return res.status(401).json({msg:'No Autorizado'});
        }

        //DELETE
        await TaskModels.findOneAndRemove({_id:req.params.id});
        res.status(200).json({msg:'Tarea eliminada con exito'});

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");

    }
}