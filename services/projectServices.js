const ProjectModel=require('../models/ProjectModels.js');
exports.projectServices=async(req, res)=>{
    try {
        //crear proyecto
        const project=new ProjectModel(req.body);
        //Guardar creador via jwt
        project.author=req.user.id;
        //guardar proyecto
        project.save();
        res.json(project);
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error en el servidor');
    }
}