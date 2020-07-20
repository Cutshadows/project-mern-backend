const mongoose=require('mongoose');

const ProjectSchema=mongoose.Schema({
    ProjectName:{
        type:String,
        required: true,
        trim:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createDate:{
        type:Date,
        default: Date.now()
    }
});

module.exports=mongoose.model('Project', ProjectSchema);