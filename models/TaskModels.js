const mongoose=require('mongoose');

const TaskSchema=mongoose.Schema({
    taskName:{
        type:String,
        required: true,
        trim:true
    },
    status:{
        type:Boolean,
        default:false
    },
    createDate:{
        type:Date,
        default: Date.now()
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
});

module.exports=mongoose.model('Task', TaskSchema);

