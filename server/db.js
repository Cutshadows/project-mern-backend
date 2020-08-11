const mongoose=require("mongoose");
const {config}=require('../config/index.js');
const connectDB=async()=>{
    try{
        await mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true
        }).catch(error=>{
        });
    }catch(error){
        process.exit(1);
    }
}
module.exports=connectDB;