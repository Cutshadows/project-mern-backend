const express=require('express');
const connectDB=require('./server/db');
const cors=require('cors');
const app=express();

//conectar a la bd
connectDB();

//use bodyparser
app.use(cors());
app.use(express.json({extended:true}));
//puerto de la app
const PORT=process.env.PORT || 3000;

//pagina principal
//ruta a usuarios 
const users=require('./routes/users');
app.use('/api/users', users);
const auth=require('./routes/auth');
app.use('/api/auth', auth);
const projects=require('./routes/projects');
app.use('/api/projects', projects);
const tasks=require('./routes/tasks');
app.use('/api/tasks', tasks);



app.listen(PORT, ()=>{
    console.log(`Esta funcionando en el puerto ${PORT}`);
})

