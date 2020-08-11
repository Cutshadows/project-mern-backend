const ProjectModel=require('../models/ProjectModels.js');
const {validationResult}=require('express-validator');
exports.projectServices=async(req, res)=>{
    //revisar si hay errores
    const errores=validationResult(req);
    if(!errores.isEmpty()){
        return res.status(
            400
            ).json(
                {
                    errores:errores.array()
                }
            );
    }
    try {
        //crear proyecto
        const project=new ProjectModel(req.body);
        //Guardar creador via jwt
        project.author=req.user.id;
        //guardar proyecto
        project.save();
        res.json(project);
        
    } catch (error) {
        res.status(500).send('Hubo un error en el servidor');
    }
}

//obtiene todos los proyectos del usuario actual
exports.getProjects=async (req, res)=>{
    try {
        const projects=await ProjectModel.find({author:req.user.id}).sort({createDate:-1});
        res.json({projects});
    } catch (error) {
        res.status(500).send('Hubo un error en el servidor');
    }
}

//actualizar el 
exports.updateProject=async(req, res)=>{
    const errores=validationResult(req);
    if(!errores.isEmpty()){
        return res.status(
            400
            ).json(
                {
                    errores:errores.array()
                }
            );
    }
    //extraer la informacion del proyecto
    const {projectName}=req.body;
    const newProject={};
    if(projectName){
        newProject.projectName=projectName;
    }
    try {
        //revisar el id
        let project= await ProjectModel.findById(req.params.id);

        //si el proyecto existe o no
        if(!project){
            return res.status(404).json({msg:'Project not found'});
        }
        //verificar el creador del proyecto
        if(project.author.toString()!==req.user.id){
            return res.status(401).json({msg:'No Autorizado'});
        }

        //actualizar
        project=await ProjectModel.findByIdAndUpdate({_id:req.params.id}, {$set:newProject}, {new: true});
        res.json({project});
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
}
exports.deleteProject=async (req, res)=>{
    try {
        //revisar el id
        let project= await ProjectModel.findById(req.params.id);

        //si el proyecto existe o no
        if(!project){
            return res.status(404).json({msg:'Project not found'});
        }
        //verificar el creador del proyecto
        if(project.author.toString()!==req.user.id){
            return res.status(401).json({msg:'No Autorizado'});
        }

        await ProjectModel.findOneAndRemove({_id: req.params.id});
        res.json({msg:'Delete project'})

    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
}