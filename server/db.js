const mongoose=require("mongoose");
const {config}=require('../config/index.js');
const connectDB=async()=>{
    try{
        console.log(`mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`);
        await mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true
        }).catch(error=>{
            console.log(error)
        });
        console.log('Db Conectada');
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}
module.exports=connectDB;