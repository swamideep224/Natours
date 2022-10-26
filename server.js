const mongoose=require("mongoose");
const dotenv=require("dotenv");


process.on("uncaughtException",err=>{
    console.log(err.name,err.message);
    console.log("UNCAUGHT EXCEPTION- Shutting Down");
    process.exit(1);
});

dotenv.config({path:'./config.env'});
const DB=process.env.DATABASE;

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
})
.then(()=>console.log("DB connection successfully"));


const app=require("./app");
const port=process.env.PORT ||8000;

const server=app.listen(port,()=>{
    console.log(`server is listening at port ${port}`);
});

process.on("unhandledRejection",err=>{
    console.log(err.name,err.message);
    console.log("UNHANDLED REJECTION - Shutting Down");
    server.close(()=>{
        process.exit(1);
    })
});

  
